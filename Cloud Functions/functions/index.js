const functions = require('firebase-functions');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
admin.initializeApp(functions.config().firebase);
// const gcs = require('@google-cloud/storage')();
const serviceAccount = './score-app-b69dc-firebase-adminsdk-8xbui-8ee62dd3f5.json';

// const gcConfig = {
//     projectId: 'score-app-b69dc',
//     keyFilename: 'score-app-b69dc-firebase-adminsdk-8xbui-8ee62dd3f5.json'
// };

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL:
// });

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