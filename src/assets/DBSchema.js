const teamSchema = {
    teamID: '',
    players: ['playerId'],
    teamName: '',
    matches: [{
        matchId: '',
        season: '',
        date: '',
        opponent:'',
        homeGoals: 0,
        opponentGoals:0,
        matchImage: '',
        participatingPlayers:[{
            playerId: '',
            goalsScored: 0,
        }]
    }],
    admin: '',
}

const playerSchema = {
    playerId:'',
    name: '',
    email:'',
    dateOfBirth: '',

}

const seasonSchema = {
    seasonId: '',
    opponents:[''],
    
}