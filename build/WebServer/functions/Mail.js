const firebase = require('../firebase-scoreapp');
const axios = require('../axios-scoreapp');
var nodeMailer = require('nodemailer');


const timerFunction = (args) => {
    firebase.firebasedb.database().ref('/Teams/').once("value").then(teams => {
        const allTeams = teams.val();
        let TeamMembers = [];

        for(let teamKey in allTeams){
            const selectedSeason = allTeams[teamKey].Seasons["2019-2020"];
            for(let teammemberId in selectedSeason.TeamMembers){
                TeamMembers.push(teammemberId);
            }
            
        }




        const fAdmin = firebase.firebaseAdmin.auth();
        fAdmin.listUsers().then(users => {
            users.users.forEach(userRecord => {
                console.log(userRecord.toJSON().email);
                const params = {
                    email: "pietervp283@gmail.com"
                }
                // axios.get('https://thewhiterussians.be:8888/mail/MatchInvite',{params:params})
                // .then(res => {
                //     console.log(res);
                // })
            })
            axios.get('https://thewhiterussians.be:8888/mail/MatchInvite',{email:'pietervp283@gmail.com'})
            .then(res => {
                console.log(res);
            })
        }).catch(error => {
            console.log(error);
        })
    })
}



exports.Timer = () => setInterval(timerFunction, (1000 * 60 *60));



