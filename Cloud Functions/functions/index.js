const functions = require('firebase-functions');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
admin.initializeApp(functions.config().firebase);

const gcConfig = {
    projectId: 'score-app-b69dc',
    keyFilename: 'score-app-b69dc-firebase-adminsdk-8xbui-3914567326.json'
};

// const gcs = require('@google-cloud/storage')(gcConfig);

exports.uploadFile = functions.https.onRequest((req, res) => {
    const gcs = admin.storage();
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed!'
            })
        }
        let uploadData = null;
        const busboy = new Busboy({ headers: req.headers });
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filePath = path.join(os.tmpdir(), filename);
            uploadData = { file: filePath, type: mimetype };
            file.pipe(fs.createWriteStream(filePath));
        })

        busboy.on('finish', () => {
            const bucket = gcs.bucket('score-app-b69dc.appspot.com');
            bucket
                .upload(uploadData.file, {
                    uploadType: "media",
                    metadata: {
                        metadata: {
                            contentType: uploadData.type
                        }
                    }
                })
                .then(() => {
                    return res.status(200).json({
                        message: "It worked!"
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err.val(),
                    });
                });
        });
        busboy.end(req.rawBody);
    });
});


exports.onFileChange = functions.storage.object().onFinalize(event => {
    console.log(event);
    const gcs = admin.storage();
    const object = event;
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('File change detected, function execution started');

    if (object.resourceState === 'not_exists') {
        console.log('We deleted a file, exit...');
        return;
    }

    if (path.basename(filePath).startsWith('resized-')) {
        console.log('We already renamed that file!');
        return;
    }
    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };
    console.log(contentType);
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'resized-' + path.basename(filePath),
            metadata: metadata
        })
    });
});