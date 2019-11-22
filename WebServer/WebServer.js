const express = require('express')
const path = require('path')
const port = process.env.PORT || 80
const app = express()
const httpApp = express()
const fs = require('fs')
const http = require('http');
const https = require('https');
const privatekey = fs.readFileSync('./keys/privkey.pem');
const ca = fs.readFileSync('./keys/fullchain.pem');


const credentials = {
  key: privatekey,
  cert: ca
}
// this assumes that all your app files
// `public` directory relative to where your server.js is
app.use(express.static(__dirname, {
  dotfiles: 'allow'
}))

httpApp.set('port', process.env.PORT || 80);
httpApp.get("*", function (req, res, next) {
  res.redirect("https://" + req.headers.host);
});

app.get('*', function (request, response) {
  console.log('success');
  if (!request.secure) {
    response.redirect("https://" + request.headers.host + request.url);
  } else {
    response.sendFile(path.resolve(__dirname, 'index.html'))
  }
})


// Starting both http & https servers
http.createServer(httpApp).listen(httpApp.get('port'), function () {
  console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

const httpsServer = https.createServer(credentials, app);

// httpServer.get('*', (req,res) => {
//   res.redirect('https://' + req.headers.host + req.url);
// })


// httpServer.listen(80, () => {
//   console.log('listening on port 80');
// });

httpsServer.listen(
  443, () => {
    console.log("Server started on port 443");
  }
);

// app.listen(80);
//httpServer.listen(port);
//httpsServer.listen(443);
// console.log("Server started on port " + port)