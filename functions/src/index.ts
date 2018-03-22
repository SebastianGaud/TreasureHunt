import * as functions from 'firebase-functions';
import * as FirebaseAdmin from 'firebase-admin';
import { FirebaseMilestone } from "../../../CacciaAlTesoro/src/app/model/firebase/firebase-milestone";
import { MilestonesTeam } from "../../../CacciaAlTesoro/src/app/model/game/game-team";


const admin = FirebaseAdmin.initializeApp(functions.config().firebase);

export const AddMilestonetoGameTeams = functions.database.ref('milestones/{pushId}')
	.onWrite(e => {
		const milestone = e.data.val() as FirebaseMilestone;
		milestone.key = e.data.key;
		console.log(milestone);
		return admin.database().ref('teamMilestones/').once("value").then((snapshot: FirebaseAdmin.database.DataSnapshot) => {
			if (!snapshot.hasChildren()) {
				return null;
			}
			let teamMilestones = snapshot.val();
			for (const key in teamMilestones) {
				if (teamMilestones.hasOwnProperty(key)) {
					const team = teamMilestones[key];
					let index = team.milestones.indexOf(team.milestones.find(m => m.key == milestone.key));
					if (index != -1) {
						admin.database()
							.ref(`teamMilestones/${team.key}/milestones/${index}`).update(milestone);
					} else {
						admin.database().ref(`teamMilestones/${team.key}/milestones/${team.milestones.length}`).set(milestone);
					}
				}
			}
			return null;
		})
	});