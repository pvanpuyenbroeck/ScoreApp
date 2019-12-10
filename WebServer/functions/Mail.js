const firebase = require("../firebase-scoreapp");
const axios = require("../axios-scoreapp");
var nodeMailer = require("nodemailer");

const timerFunction = args => {
  const activeSeason = "2019-2020";
  firebase.firebasedb
    .database()
    .ref("/Teams/")
    .once("value")
    .then(teams => {
      const allTeams = teams.val();
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

        if (nextMatchInLessThenADay(nextMatch)) {
          for (let teammemberId in activeTeamSeason.TeamMembers) {
            TeamMembers.push(teammemberId);
          }
        }

        const fAdmin = firebase.firebaseAdmin.auth();
        fAdmin
          .listUsers()
          .then(users => {
            users.users.forEach(userRecord => {
              const userInfo = userRecord.toJSON();
              const email = userInfo.email;
              const uid = userInfo.uid;
              const name = userInfo.displayName;

              console.log(userRecord.toJSON().email);
              const params = {
                email: "pietervp283@gmailtest.com"
              };
              axios
                .get("https://thewhiterussians.be:8888/mail/MatchInvite", {
                  params: params
                })
                .then(res => {});
            });
            const teamRef = firebase.firebasedb
              .database()
              .ref(
                `/Teams/${teamKey}/Seasons/${activeSeason}/Matches/${nextMatch.matchid}`
              );

            teamRef.once("value").then(match => {
              const MatchDetails = {
                ...match.val(),
                twentyFourHourEmailSend: true
              };
              teamRef.set(MatchDetails).catch(error => {
                console.log(error);
              });
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
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
      lastMatch.weekDif !== 0 ||
      lastMatch.dayDif !== 0 ||
      lastMatch.minutesDif !== 0 ||
      lastMatch.secondsDif !== 0 ||
      lastMatch.hourDif !== 0
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
  const dayDifAbso =
    7 * (Math.floor(diff) === 0 ? diff : diff % Math.floor(diff));
  result.dayDif = Math.floor(dayDifAbso);
  result.weekDif = Math.abs(Math.floor(diff));
  const hourDifAbso =
    24 *
    (Math.floor(dayDifAbso) === 0 ? dayDifAbso : dayDifAbso % result.dayDif);
  result.hourDif = Math.floor(hourDifAbso);
  const minutesDifAbso =
    60 *
    (Math.floor(hourDifAbso) === 0
      ? hourDifAbso
      : hourDifAbso % result.hourDif);
  result.minutesDif = Math.floor(minutesDifAbso);
  const secondsDifAbso =
    60 *
    (result.minutesDif === 0
      ? minutesDifAbso
      : minutesDifAbso % result.minutesDif);
  result.secondsDif = Math.floor(secondsDifAbso);

  return result;
};

// exports.Timer = () => setInterval(timerFunction, 1000 * 60 * 60 * 24);
exports.TestClicked = timerFunction;
