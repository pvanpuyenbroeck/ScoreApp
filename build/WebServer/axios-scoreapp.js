const axios = require('axios');

// const instanceTest = axios.create({
//     baseURL:'https://score-app-b69dc.firebaseio.com/'
// });

const instanceLive = axios.create({
    baseURL:'https://mvcscorelive.firebaseio.com'
});
module.exports = instanceLive;