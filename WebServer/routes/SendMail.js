const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("Sending mail from here");
})

module.exports = router;