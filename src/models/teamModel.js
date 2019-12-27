export class Match {
	constructor(_match) {
		this.Participants = typeof _match !== "undefined" ? _match.Participants : "";
		this.gameData = typeof _match !== "undefined" ? new GameData(_match.gameData) : new GameData();
		this.matchId = typeof _match !== "undefined" ? _match.matchId : "";
		this.oponentGoals = typeof _match !== "undefined" ? _match.oponentGoals : "";
	}
}

class Participant {
	constructor(_active, _attending, _email, _familienaam, _goals, _lastSelectedTeam, _playerNumber, _userid, _username, _voornaam) {
		this.active = _active
		this.attending = _attending
		this.email = _email
		this.familienaam = _familienaam
		this.goals = _goals
		this.lastSelectedTeam = _lastSelectedTeam
		this.playerNumber = _playerNumber
		this.userid = _userid
		this.username = _username
		this.voornaam = _voornaam
	}
}

class GameData {
	constructor(_gameData = null) {
		this.date = _gameData !== null ? _gameData.date : "";
		this.locatie = _gameData !== null ? _gameData.locatie : "";
		this.opponent = _gameData !== null ? _gameData.opponent : "";
		this.sporthal = _gameData !== null ? _gameData.sporthal : "";
		this.teamId = _gameData !== null ? _gameData.teamId : "";
	}
}

class Locatie {
	constructor(_gemeente, _nummer, _postcode, _straat) {
		this.gemeente = _gemeente
		this.nummer = _nummer
		this.postcode = _postcode
		this.straat = _straat
	}
}
