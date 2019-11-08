const express = require('express')
const path = require('path')
const port = process.env.PORT || 80
const app = express()
const fs = require('fs');
const http = require('http');
const https = require('https');
const privatekey = fs.readFileSync('/etc/letsencrypt/live/www.thewhiterussians.be/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.thewhiterussians.be/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.thewhiterussians.be/fullchain.pem', 'utf8');

const credentials = {key:privatekey, cert: certificate, ca:ca }
// this assumes that all your app files
// `public` directory relative to where your server.js is
app.use(express.static(__dirname, { dotfiles: 'allow' } ))

app.get('*', function (request, response){
  console.log('success');
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log('listening on port 80');
});

httpsServer.listen(
  443, () => {
    console.log("Server started on port 443");
  }
);

// app.listen(80);
//httpServer.listen(port);
//httpsServer.listen(443);
// console.log("Server started on port " + port)
