const mailFunctions = require("./functions/Mail");
const express = require("express")
const path = require("path")
const port = process.env.PORT || 8080
const app = express()
const fs = require("fs")
const http = require("http")
const sendmailRouter = require('./routes/SendMail');

app.get("/", function(request, response) {
	console.log("success")
	response.send("Gelukt");
	// response.sendFile(path.resolve(__dirname, "index.html"))
})

mailFunctions.Timer();

//link routes to app
app.use('/sendmail', sendmailRouter);

const httpServer = http.createServer(app)

// httpServer.get('*', (req,res) => {
//   res.redirect('https://' + req.headers.host + req.url);
// })

httpServer.listen(port, () => {
	console.log(`listening on port ${port}`)
})

// httpsServer.listen(
//   443, () => {
//     console.log("Server started on port 443");
//   }
// );

// app.listen(80);
//httpServer.listen(port);
//httpsServer.listen(443);
// console.log("Server started on port " + port)
