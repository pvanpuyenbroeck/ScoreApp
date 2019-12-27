const express = require('express');
const router = express.Router();

const Email = require('email-templates');
const email = new Email(  {preview: {
    open: {
      app: 'firefox',
      wait: false
    }
  }});

router.get('/', (req,res) => {
    res.send("<h1>Test Pagina</h1>")
    // email.render('indexPug');
    // return res.render('indexPug');
    // res.send("Sending mail from here");
})

module.exports = router;