import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import classes from "./MatchDetailsMenu.css"

import MatchDetails from "../../../components/Games/MatchDetails/MatchDetails"
import DetailsContainer from "../../../components/UI/DetailsContainer/DetailsContainer"
import MatchPlayersOverview from "../../../components/Match/MatchPlayersOverview/MatchPlayersOverview"
import * as actions from "../../../store/actions/index"

const MatchDetailsMenu = props => {
    let params = new URLSearchParams(window.location.search)
    console.log(params);
	const dispatch = useDispatch()
	const joinClickedHandler = (match, addOrRemove) => {
		let updatedParticipants = { ...match.Participants }
		let updatedMatch = { ...match }
		let updatedTeam = { ...props.team }
		const selectedSeason = { ...props.team.Seasons[props.selectedSeason] }
		if (addOrRemove === "add") {
			updatedParticipants[props.user.uid] = {
				...selectedSeason.filteredPlayers[props.user.uid],
				active: true,
				goals: 0,
				attending: true
			}
		} else if (addOrRemove === "remove") {
			delete updatedParticipants[props.user.uid]
		}
		updatedMatch.Participants = updatedParticipants
		props.setSelectedMatch(updatedMatch)
		// this.setState({
		//     selectedMatch: updatedMatch,
		// })
		updatedTeam.Seasons[props.selectedSeason].Matches[props.selectedMatchId] = updatedMatch

		dispatch(actions.updateSelectedTeam(updatedTeam))
		// dispatch(actions.updatePlayerAdmins(props.team.teamId, updatedParticipants, , props.selectedMatchId, props.selectedSeason));
	}

	const GetMatchDetailsMenu = () => {
		if (typeof props.team.Seasons === "undefined" || typeof props.team.Seasons[props.selectedSeason] === "undefined") {
			return null
		}
		const match = typeof props.team.Seasons !== "undefined" ? props.team.Seasons[props.selectedSeason].Matches[props.selectedMatchId] : null
		if (props.showMatchMenu) {
			if (typeof props.team.Seasons !== "undefined") {
				return (
					<DetailsContainer closeContainer={props.closeAllContainers}>
						<div className={classes.MatchNavButtonContainer}>
							<div onClick={props.matchDetailsToggleHandler} className={[classes.Button, classes.ButtonMatch].join(" ")} style={{ opacity: props.matchDetailsToggle ? "0.5" : "1" }}>
								Match
							</div>
							<div onClick={props.matchDetailsToggleHandlerTrue} className={[classes.Button, classes.ButtonMembers].join(" ")} style={{ opacity: !props.matchDetailsToggle ? "0.5" : "1" }}>
								Deelnemers
							</div>
						</div>
						{!props.matchDetailsToggle
							? <MatchDetails
									removeMatchClicked={props.removeMatchHandler}
									isAdmin={props.adminLoggedIn}
									matches={match}
									width={"100%"}
									// joinMatchClicked={() => this.joinClickedHandler()}
								/>
							: <MatchPlayersOverview user={props.user} match={match} allTeamMember={props.team.Seasons[props.selectedSeason].TeamMembers} joinClicked={() => joinClickedHandler(match, "add")} removeClicked={() => joinClickedHandler(match, "remove")} />}
					</DetailsContainer>
				)
			} else {
				return null
			}
		}
		return null
	}
	return <GetMatchDetailsMenu />
}

export default MatchDetailsMenu
