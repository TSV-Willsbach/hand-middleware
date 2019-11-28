import { proxyService } from "./proxyService";
import { playerStat } from "models/teamModel";

export class teamService extends proxyService {

    public getStatistics(games) {
        let players = Array<playerStat>();

        return games.then(result => {
            result.forEach(element => {
                element.playerStatistics.forEach(player => {
                    let found = players.find(pl => {
                        if (pl.name === player.name && pl.preName === player.preName) {
                            return true;
                        }
                        return false;
                    });
                    if (found === undefined) {
                        players.push({
                            name: player.name,
                            preName: player.preName,
                            games: 1,
                            goals: player.goals,
                            goalsPerGame: player.goals,
                            penalties: player.penalties,
                            penaltyGoals: player.penaltyGoals,
                            penaltyQuota: +(player.penaltyGoals / player).toFixed(2),
                            yellowCard: player.yellowCard,
                            twoMinutes: player.twoMinutes,
                            redCard: player.redCard,
                            blueCard: player.blueCard
                        });
                    } else {
                        let index = players.indexOf(found);
                        found.goals = found.goals + player.goals;
                        found.penalties = found.penalties + player.penalties;
                        found.penaltyGoals = found.penaltyGoals + player.penaltyGoals;
                        found.penaltyQuota = +(found.penaltyGoals / found.penalties).toFixed(2);
                        found.yellowCard = found.yellowCard + player.yellowCard;
                        found.twoMinutes = found.twoMinutes + player.twoMinutes;
                        found.redCard = found.redCard + player.redCard;
                        found.blueCard = found.blueCard + player.blueCard;
                        found.games++;
                        found.goalsPerGame = +(found.goals / found.games).toFixed(2);

                        players[index] = found;
                    }
                });
            });
            players.sort((a, b) => b.goals - a.goals);
            return players;
        });
    }
}