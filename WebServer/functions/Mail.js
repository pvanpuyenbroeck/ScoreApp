const firebase = require('../firebase-scoreapp');

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
            console.log(users);
        }).catch(error => {
            console.log(error);
        })
    })
}

exports.Timer = () => setInterval(timerFunction, (1000));



