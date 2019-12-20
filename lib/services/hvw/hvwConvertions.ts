import { Game, Ligue, Score, Club, Statistic, Goals } from './../../models/hvwModel';

export class hvwConvertions {
    public mapClub(element) {
        let club: Club;
        let classes = new Array<Ligue>();

        element.content.classes.forEach(x => {
            let ligue = this.mapLigue(x);
            classes.push(ligue);
        });

        club = {
            id: '',
            name: element.head.name,
            shortName: element.head.sname,
            headline1: element.head.headline1,
            headline2: element.head.headline2,
            actualized: element.head.actualized,
            ligues: classes
        };
        return club;
    }


    public mapLigue(ligueData) {
        let ligue: Ligue;
        let id;
        let games = new Array<Game>();
        let scores = new Array<Score>();
        try {
            id = ligueData.content.futureGames.gClassID;
            ligueData.content.futureGames.games.forEach(element => {
                let game = this.mapGame(element, ligueData);
                games.push(game);
            });
        } catch (error) {
            ligueData.games.forEach(element => {
                let game = this.mapGame(element, ligueData);
                games.push(game);
            });
        }

        try {
            ligueData.content.score.forEach(element => {
                let score = this.mapScore(element);
                score.statistics = this.calcStat(score, games);
                scores.push(score);
            });
        } catch (error) {
            console.log('Score', error);
        }

        try {
            ligue = {
                id: id,
                name: ligueData.head.name,
                shortName: ligueData.head.sname,
                headline1: ligueData.head.headline1,
                headline2: ligueData.head.headline2,
                actualized: ligueData.head.actualized,
                comment: ligueData.content.scoreComments[0],
                scores: scores,
                games: games

            };
        } catch (error) {
            ligue = {
                id: ligueData.gClassID,
                name: '',
                shortName: ligueData.gClassSname,
                scores: scores,
                games: games
            };
        }
        return ligue;
    }

    public mapScore(element) {
        let score: Score;

        score = {
            id: element.tabTeamID,
            rank: element.tabScore,
            live: element.liveTeam,
            name: element.tabTeamname,
            games: {
                played: element.numPlayedGames,
                won: element.numWonGames,
                equal: element.numEqualGames,
                lost: element.numLostGames
            },
            goals: {
                shot: element.numGoalsShot,
                got: element.numGoalsGot,
                difference: element.numGoalsShot - element.numGoalsGot
            },
            points: {
                plus: element.pointsPlus,
                minus: element.pointsMinus
            }
        };
        return score;
    }

    public mapGame(element, ligue) {
        let game: Game;
        let reportUrl;

        if (element.sGID !== 0) {
            reportUrl = ligue.head.repURL + element.sGID;
        }


        game = {
            id: element.gID,
            date: this.buildDate(element.gDate, element.gTime),
            live: element.live,
            team: {
                home: element.gHomeTeam,
                guest: element.gGuestTeam
            },
            goals: {
                end: {
                    home: +element.gHomeGoals,
                    guest: +element.gGuestGoals
                },
                halfTime: {
                    home: +element.gHomeGoals_1,
                    guest: +element.gGuestGoals_1
                }
            },
            points: {
                home: +element.gHomePoints,
                guest: +element.gGuestPoints
            },
            gymnasium: {
                id: element.gGymnasiumID,
                number: element.gGymnasiumNo,
                name: element.gGymnasiumName,
                street: element.gGymnasiumStreet,
                postal: element.gGymnasiumPostal,
                city: element.gGymnasiumTown
            },
            referees: element.gReferee,
            comment: element.gComment,
            sortText: element.gGroupsortTxt,
            appId: element.gAppid,
            token: element.gToken,
            report: reportUrl
        }

        return game;
    }

    private calcStat(team: Score, games: Array<Game>): Statistic {
        let homeGames: Array<Game>;
        let statistic: Statistic;
        let awayGames: Array<Game>;
        let regex: RegExp;
        let teamNumber = +team.name.match(/\d+(?=\D*$)/g);
        if (teamNumber > 10) {
            teamNumber = 0;
        }

        let shortName = team.name.replace(/[0-9]/g, '');
        shortName = shortName.replace(/  +/g, ' ');
        shortName = shortName.substring(0, 7);

        if (isNaN(teamNumber) || teamNumber === 0) {
            regex = new RegExp(`(?:${shortName})+`);
        } else {
            regex = new RegExp(`(?:${shortName}.*${teamNumber})+`);
        }
        homeGames = games.filter((el) => el.team.home == team.name);
        if (homeGames.length === 0) {
            homeGames = games.filter((el) => el.team.home.match(regex));
        }

        awayGames = games.filter((el) => el.team.guest == team.name);
        if (awayGames.length === 0) {
            awayGames = games.filter((el) => el.team.guest.match(regex));
        }
        let homeGoals: Goals = {
            shot: 0,
            got: 0
        };

        let awayGoals: Goals = {
            shot: 0,
            got: 0
        };
        let homeOpponent = {
            lose: {
                name: '',
                difference: 0,
                result: ''
            },
            win: {
                name: '',
                difference: 0,
                result: ''
            }
        }

        let awayOpponent = {
            lose: {
                name: '',
                difference: 0,
                result: ''
            },
            win: {
                name: '',
                difference: 0,
                result: ''
            }
        }

        homeGames.forEach(element => {
            homeGoals.shot = homeGoals.shot + element.goals.end.home;
            homeGoals.got = homeGoals.got + element.goals.end.guest;

            let difference = element.goals.end.home - element.goals.end.guest;

            if (element.points.home === 2 && difference > homeOpponent.win.difference) {
                homeOpponent.win = {
                    difference: difference,
                    name: element.team.guest,
                    result: `${element.goals.end.home} : ${element.goals.end.guest}`
                };
            } else if (element.points.guest === 2 && difference < homeOpponent.lose.difference) {
                homeOpponent.lose = {
                    difference: difference,
                    name: element.team.guest,
                    result: `${element.goals.end.home} : ${element.goals.end.guest}`
                };
            }
        });

        awayGames.forEach(element => {
            awayGoals.shot = awayGoals.shot + element.goals.end.guest;
            awayGoals.got = awayGoals.got + element.goals.end.home;

            let difference = element.goals.end.home - element.goals.end.guest;

            if (element.points.home === 2 && difference > awayOpponent.lose.difference) {
                awayOpponent.lose = {
                    difference: difference,
                    name: element.team.home,
                    result: `${element.goals.end.home} : ${element.goals.end.guest}`
                };
            } else if (element.points.guest === 2 && difference < awayOpponent.win.difference) {
                awayOpponent.win = {
                    difference: difference,
                    name: element.team.home,
                    result: `${element.goals.end.home} : ${element.goals.end.guest}`
                };
            }
        });

        statistic = {
            gameWon: {
                home: {
                    amount: homeGames.filter((el) => el.points.home === 2).length,
                    games: homeGames.filter((el) => el.points.guest !== 0 || el.points.home !== 0).length
                },
                away: {
                    amount: awayGames.filter((el) => el.points.guest === 2).length,
                    games: awayGames.filter((el) => el.points.guest !== 0 || el.points.home !== 0).length
                }
            },
            goalsShot: {
                home: {
                    goals: homeGoals.shot
                },
                away: {
                    goals: awayGoals.shot
                }
            },
            goalsGot: {
                home: {
                    goals: homeGoals.got
                },
                away: {
                    goals: awayGoals.got
                }
            },
            highestWin: {
                home: { name: homeOpponent.win.name, result: homeOpponent.win.result },
                away: { name: awayOpponent.win.name, result: awayOpponent.win.result }
            },
            highestLose: {
                home: { name: homeOpponent.lose.name, result: homeOpponent.lose.result },
                away: { name: awayOpponent.lose.name, result: awayOpponent.lose.result }
            }
        }

        statistic.gameWon.home.percentage = +((statistic.gameWon.home.amount / statistic.gameWon.home.games) * 100).toFixed(2);
        statistic.gameWon.away.percentage = +((statistic.gameWon.away.amount / statistic.gameWon.away.games) * 100).toFixed(2);
        statistic.goalsShot.home.average = +(statistic.goalsShot.home.goals / statistic.gameWon.home.games).toFixed(2);
        statistic.goalsShot.away.average = +(statistic.goalsShot.away.goals / statistic.gameWon.away.games).toFixed(2);
        statistic.goalsGot.home.average = +(statistic.goalsGot.home.goals / statistic.gameWon.home.games).toFixed(2);
        statistic.goalsGot.away.average = +(statistic.goalsGot.away.goals / statistic.gameWon.away.games).toFixed(2);

        return statistic;
    }


    public buildDate(date, time): Date {
        if (date === undefined) {
            return null;
        }
        let myDate = new Date(date.replace(/(\d{2}).(\d{2}).(\d{2})/, "$2/$1/$3"));
        myDate.setHours(+time.substring(0, 2));
        myDate.setMinutes(+time.substring(3, 5));
        return myDate;
    }
}