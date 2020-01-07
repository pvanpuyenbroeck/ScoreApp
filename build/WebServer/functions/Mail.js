const firebase = require("../firebase-scoreapp");
const axios = require("../axios-scoreapp");
var nodeMailer = require("nodemailer");

const checkInviteMatchMail = async args => {
    const activeSeason = "2019-2020";
    const allTeams = await getAllTeams();
    let TeamMembers = [];

    for (let teamKey in allTeams) {
        const activeTeamSeason = allTeams[teamKey].Seasons[activeSeason];
        let matchesArray = [];

        for (let matchid in activeTeamSeason.Matches) {
            matchesArray.push({
                ...activeTeamSeason.Matches[matchid],
                matchid: matchid
            });
        }
        const nextMatch = getAllComingMatches(matchesArray)[0];

        if (
            nextMatchInLessThenADay(nextMatch) &&
            (typeof nextMatch.gameData.twentyFourHourEmailSend === "undefined" || nextMatch.gameData.twentyFourHourEmailSend === false)
        ) {
            for (let teammemberId in activeTeamSeason.TeamMembers) {
                TeamMembers.push(teammemberId);
            }

            const users = await getAllUsers();
            const filteredUsers = users.filter(user => {
                return TeamMembers.includes(user.uid);
            });
            sendMailToUsers(filteredUsers, nextMatch);
            const teamRef = firebase.firebasedb.database().ref(`/Teams/${teamKey}/Seasons/${activeSeason}/Matches/${nextMatch.matchid}`);
            setTwentyFourHourEmailSend(teamRef);
        }
    }
};

const setTwentyFourHourEmailSend = firebaseRef => {
    firebaseRef.once("value").then(match => {
        const MatchDetails = {
            ...match.val(),
            twentyFourHourEmailSend: true
        };
        firebaseRef.set(MatchDetails).catch(error => {
            console.log(error);
        });
    });
};

const getAllTeams = async () => {
    return firebase.firebasedb
        .database()
        .ref("/Teams/")
        .once("value")
        .then(teams => {
            return teams.val();
        });
};

const sendMailToUsers = (filteredPlayers, nextMatch) => {
    filteredPlayers.forEach(userRecord => {
        const location = nextMatch.gameData.locatie;
        const email = userRecord.email;
        const uid = userRecord.uid;
        const name = typeof userRecord.displayName === "undefined" ? "Playaa" : userRecord.displayName;
        const locatie = nextMatch.gameData.sporthal;
        const opponent = nextMatch.gameData.opponent;
        const params = {
            email: "pietervp283@gmailtest.com",
            uid: uid,
            teamName: name,
            date: userRecord,
            opponent: opponent,
            locatie: locatie
        };
        axios
            .get("https://thewhiterussians.be:8888/mail/MatchInvite", {
                params: params
            })
            .then(res => {});
    });
};

const getAllUsers = async () => {
    const fAdmin = firebase.firebaseAdmin.auth();
    return fAdmin
        .listUsers()
        .then(users => {
            let Users = [];
            users.users.forEach(userRecord => {
                const userInfo = userRecord.toJSON();
                Users.push(userInfo);
            });
            return Users;
        })
        .catch(error => {
            console.log(error);
        });
};

const nextMatchInLessThenADay = nextMatch => {
    const dateNextMatch = new Date(nextMatch.gameData.date);
    const timeDifference = countDownClock(dateNextMatch);
    if (timeDifference.weekDif === 0 && timeDifference.dayDif === 0) {
        return true;
    }
};

const sortOnDate = dateArray =>
    dateArray.sort((a, b) => {
        if (a.gameData.date < b.gameData.date) {
            return -1;
        }
        if (a.gameData.date > b.gameData.date) {
            return 1;
        }
        return 0;
    });

const getAllComingMatches = matches => {
    const comingMatches = matches.filter(match => {
        let lastMatch = countDownClock(match.gameData.date);
        return (
            lastMatch.weekDif !== 0 || lastMatch.dayDif !== 0 || lastMatch.minutesDif !== 0 || lastMatch.secondsDif !== 0 || lastMatch.hourDif !== 0
        );
    });
    return sortOnDate(comingMatches);
};

const countDownClock = datum => {
    const date = new Date(datum);
    const now = new Date(Date.now());
    const result = {
        weekDif: 0,
        dayDif: 0,
        hourDif: 0,
        minutesDif: 0,
        secondsDif: 0,
        initiated: true
    };
    let diff = (date.getTime() - now.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7;
    if (diff <= 0) {
        return result;
    }
    const dayDifAbso = 7 * (Math.floor(diff) === 0 ? diff : diff % Math.floor(diff));
    result.dayDif = Math.floor(dayDifAbso);
    result.weekDif = Math.abs(Math.floor(diff));
    const hourDifAbso = 24 * (Math.floor(dayDifAbso) === 0 ? dayDifAbso : dayDifAbso % result.dayDif);
    result.hourDif = Math.floor(hourDifAbso);
    const minutesDifAbso = 60 * (Math.floor(hourDifAbso) === 0 ? hourDifAbso : hourDifAbso % result.hourDif);
    result.minutesDif = Math.floor(minutesDifAbso);
    const secondsDifAbso = 60 * (result.minutesDif === 0 ? minutesDifAbso : minutesDifAbso % result.minutesDif);
    result.secondsDif = Math.floor(secondsDifAbso);

    return result;
};

exports.Timer = () => setInterval(checkInviteMatchMail, 1000 * 60 * 60 * 24);
exports.TestClicked = checkInviteMatchMail;
