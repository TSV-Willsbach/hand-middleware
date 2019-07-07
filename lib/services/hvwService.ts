import { Game, Ligue, Score, Club } from './../models/hvwModel';
import { proxyService } from "./proxyService";

export class hvwService extends proxyService {

    protected uri = 'https://spo.handball4all.de/service/if_g_json.php'
    protected tickerUri = 'http://spo.handball4all.de/service/ticker.html?appid=&token=';
    protected reportUri = 'http://spo.handball4all.de/misc/sboPublicReports.php?sGID=';


    public getClubs() {
        let clubs = new Array<Club>();

        let promise = new Promise<Club[]>((resolve, reject) => {
            this.getClub(null).then(x => {
                clubs.push(x);
                this.getClub('75').then(x => {
                    clubs.push(x);
                    resolve(clubs);
                });
            });
        });
        return promise;
    }

    public getClub(period) {
        if (period === null) {
            period = '68';
        }
        this.options.uri = this.uri + '?c=60&cmd=pcu&og=3' + `&p=${period}`;

        return this.request
            .get(this.options)
            .then(response => {
                let club: Club;
                club = this.mapClub(response[0]);
                club.id = period;
                return club;
            });
    }

    public getGames(id) {
        return this.getLigue(id).then(x => {
            return x.games;
        });
    }

    public getLigue(id) {
        this.options.uri = this.uri + `?ca=1&og=3&cmd=ps&cl=${id}`;

        return this.request
            .get(this.options)
            .then(response => {
                let ligue: Ligue;
                ligue = this.mapLigue(response[0]);
                return ligue;
            });
    }

    private mapClub(element) {
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


    private mapLigue(element) {
        let ligue: Ligue;
        let id;
        let games = new Array<Game>();
        let scores = new Array<Score>();
        try {
            element.content.score.forEach(element => {
                let score = this.mapScore(element);
                scores.push(score);
            });
        } catch (error) { }

        try {
            id = element.content.futureGames.gClassID;
            element.content.futureGames.games.forEach(element => {
                let game = this.mapGame(element);
                games.push(game);
            });
        } catch (error) {
            element.games.forEach(element => {
                let game = this.mapGame(element);
                games.push(game);
            });
        }

        try {
            ligue = {
                id: id,
                name: element.head.name,
                shortName: element.head.sname,
                headline1: element.head.headline1,
                headline2: element.head.headline2,
                actualized: element.head.actualized,
                comment: element.content.scoreComments,
                scores: scores,
                games: games

            };
        } catch (error) {
            ligue = {
                id: element.gClassID,
                name: '',
                shortName: element.gClassSname,
                scores: scores,
                games: games
            };
        }
        return ligue;
    }

    private mapScore(element) {
        let score: Score;
        console.log(element);
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
                got: element.numGoalsGot
            },
            points: {
                plus: element.pointsPlus,
                minus: element.pointsMinus
            }
        };
        return score;
    }

    private mapGame(element) {
        let game: Game;

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
            token: element.gToken
        }

        return game;
    }

    private buildDate(date, time): Date {
        if (date === undefined) {
            return null;
        }
        let myDate = new Date(date.replace(/(\d{2}).(\d{2}).(\d{2})/, "$2/$1/$3"));
        myDate.setUTCHours(+time.substring(0, 2));
        myDate.setUTCMinutes(+time.substring(3, 5));
        return myDate;
    }

}