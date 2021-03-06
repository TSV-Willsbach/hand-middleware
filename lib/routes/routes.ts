/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { ClubController } from './../controllers/clubController';
import { PlayerController } from './../controllers/playerController';
import { TeamController } from './../controllers/teamController';
import { WpController } from './../controllers/wpController';
import { hvwController } from './../controllers/hvwController';
import { playerStatisticController } from './../controllers/playerStatisticController';
import * as express from 'express';

const models: TsoaRoute.Models = {
    "Player": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "prename": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "number": { "dataType": "double", "required": true },
            "birthday": { "dataType": "string" },
            "coach": { "dataType": "array", "array": { "dataType": "string" } },
            "team": { "dataType": "array", "array": { "dataType": "string" } },
        },
    },
    "playerStat": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "preName": { "dataType": "string", "required": true },
            "games": { "dataType": "double", "required": true },
            "penalties": { "dataType": "double", "required": true },
            "penaltyGoals": { "dataType": "double", "required": true },
            "penaltyQuota": { "dataType": "double", "required": true },
            "yellowCard": { "dataType": "double", "required": true },
            "twoMinutes": { "dataType": "double", "required": true },
            "redCard": { "dataType": "double", "required": true },
            "blueCard": { "dataType": "double", "required": true },
            "goals": { "dataType": "double", "required": true },
            "goalsPerGame": { "dataType": "double", "required": true },
        },
    },
    "Tag": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string" },
        },
    },
    "Picture": {
        "properties": {
            "url": { "dataType": "string", "required": true },
            "width": { "dataType": "double" },
            "height": { "dataType": "double" },
            "mime_type": { "dataType": "string" },
        },
    },
    "PostCustomAttributes": {
        "properties": {
            "hide_start": { "dataType": "boolean" },
        },
    },
    "Post": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "date": { "dataType": "datetime", "required": true },
            "modified": { "dataType": "datetime" },
            "title": { "dataType": "string", "required": true },
            "author": { "dataType": "string", "required": true },
            "excerpt": { "dataType": "string", "required": true },
            "content": { "dataType": "string", "required": true },
            "categories": { "dataType": "array", "array": { "ref": "Tag" } },
            "tags": { "dataType": "array", "array": { "ref": "Tag" } },
            "isNew": { "dataType": "boolean" },
            "sticky": { "dataType": "boolean" },
            "picture": { "ref": "Picture" },
            "customAttr": { "ref": "PostCustomAttributes" },
        },
    },
    "Posts": {
        "properties": {
            "maxPages": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "posts": { "dataType": "array", "array": { "ref": "Post" }, "required": true },
        },
    },
    "Sizes": {
        "properties": {
            "thumbnail": { "ref": "Picture" },
            "small": { "ref": "Picture" },
            "medium": { "ref": "Picture" },
            "large": { "ref": "Picture" },
        },
    },
    "Sponsor": {
        "properties": {
            "url": { "dataType": "string" },
            "type": { "dataType": "string" },
        },
    },
    "Media": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "date": { "dataType": "datetime", "required": true },
            "modified": { "dataType": "datetime" },
            "title": { "dataType": "string", "required": true },
            "author": { "dataType": "string", "required": true },
            "url": { "dataType": "string", "required": true },
            "width": { "dataType": "double" },
            "height": { "dataType": "double" },
            "mime_type": { "dataType": "string" },
            "archived": { "dataType": "boolean", "required": true },
            "alt_text": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "sizes": { "ref": "Sizes" },
            "caption": { "dataType": "string" },
            "team": { "dataType": "string" },
            "sponsor": { "ref": "Sponsor" },
        },
    },
    "Goals": {
        "properties": {
            "shot": { "dataType": "double", "required": true },
            "got": { "dataType": "double", "required": true },
            "difference": { "dataType": "double" },
        },
    },
    "Statistic": {
        "properties": {
            "gameWon": { "dataType": "any", "required": true },
            "goalsShot": { "dataType": "any", "required": true },
            "goalsGot": { "dataType": "any", "required": true },
            "highestWin": { "dataType": "any", "required": true },
            "highestLose": { "dataType": "any", "required": true },
        },
    },
    "Score": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "rank": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "live": { "dataType": "boolean", "required": true },
            "games": { "dataType": "any", "required": true },
            "goals": { "ref": "Goals", "required": true },
            "points": { "dataType": "any", "required": true },
            "statistics": { "ref": "Statistic" },
        },
    },
    "Gymnasium": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "number": { "dataType": "string", "required": true },
            "name": { "dataType": "string" },
            "street": { "dataType": "string" },
            "postal": { "dataType": "string" },
            "city": { "dataType": "string" },
        },
    },
    "Teams": {
        "properties": {
            "home": { "dataType": "double", "required": true },
            "guest": { "dataType": "double", "required": true },
        },
    },
    "gameGoals": {
        "properties": {
            "end": { "ref": "Teams", "required": true },
            "halfTime": { "ref": "Teams", "required": true },
        },
    },
    "Game": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "live": { "dataType": "boolean", "required": true },
            "date": { "dataType": "datetime", "required": true },
            "gymnasium": { "ref": "Gymnasium", "required": true },
            "team": { "dataType": "any", "required": true },
            "goals": { "ref": "gameGoals", "required": true },
            "points": { "ref": "Teams", "required": true },
            "referees": { "dataType": "string", "required": true },
            "comment": { "dataType": "string" },
            "sortText": { "dataType": "string" },
            "token": { "dataType": "string" },
            "appId": { "dataType": "string" },
            "report": { "dataType": "string" },
        },
    },
    "Ligue": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "shortName": { "dataType": "string", "required": true },
            "comment": { "dataType": "string" },
            "headline1": { "dataType": "string" },
            "headline2": { "dataType": "string" },
            "actualized": { "dataType": "string" },
            "scores": { "dataType": "array", "array": { "ref": "Score" } },
            "games": { "dataType": "array", "array": { "ref": "Game" }, "required": true },
        },
    },
    "Club": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "shortName": { "dataType": "string", "required": true },
            "headline1": { "dataType": "string" },
            "headline2": { "dataType": "string" },
            "actualized": { "dataType": "string" },
            "ligues": { "dataType": "array", "array": { "ref": "Ligue" } },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
    app.get('/clubs',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ClubController();


            const promise = controller.getClubs.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/clubs/:id',
        function(request: any, response: any, next: any) {
            const args = {
                ID: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ClubController();


            const promise = controller.getSingleClub.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/players',
        function(request: any, response: any, next: any) {
            const args = {
                requstBody: { "in": "body", "name": "requstBody", "required": true, "ref": "Player" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlayerController();


            const promise = controller.addNewPlayer.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/players',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlayerController();


            const promise = controller.getPlayers.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/players/:id',
        function(request: any, response: any, next: any) {
            const args = {
                ID: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlayerController();


            const promise = controller.getSinglePlayer.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/players/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlayerController();


            const promise = controller.deletePlayer.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.put('/players/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                requstBody: { "in": "body", "name": "requstBody", "required": true, "ref": "Player" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PlayerController();


            const promise = controller.updatePlayer.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/teams',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamController();


            const promise = controller.getTeams.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/teams/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamController();


            const promise = controller.getSingleTeam.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/teams/:id/games',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                saison: { "in": "query", "name": "saison", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamController();


            const promise = controller.getTeamGames.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/teams/:id/statistic',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                saison: { "in": "query", "name": "saison", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new TeamController();


            const promise = controller.getTeamStatistic.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/posts',
        function(request: any, response: any, next: any) {
            const args = {
                page: { "in": "query", "name": "page", "dataType": "double" },
                category: { "in": "query", "name": "category", "dataType": "double" },
                hide_start: { "default": true, "in": "query", "name": "hide_start", "dataType": "boolean" },
                sticky: { "in": "query", "name": "sticky", "dataType": "boolean" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getPosts.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/posts/:id',
        function(request: any, response: any, next: any) {
            const args = {
                ID: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getPost.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/reports',
        function(request: any, response: any, next: any) {
            const args = {
                page: { "in": "query", "name": "page", "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getReports.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/media/all',
        function(request: any, response: any, next: any) {
            const args = {
                archived: { "in": "query", "name": "archived", "dataType": "boolean" },
                search: { "in": "query", "name": "search", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getMedia.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/media/all/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getSingleMedia.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/media/teams',
        function(request: any, response: any, next: any) {
            const args = {
                archived: { "in": "query", "name": "archived", "dataType": "boolean" },
                teamId: { "in": "query", "name": "teamId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getTeamPhotos.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/wp/media/sponsors',
        function(request: any, response: any, next: any) {
            const args = {
                archived: { "in": "query", "name": "archived", "dataType": "boolean" },
                type: { "in": "query", "name": "type", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new WpController();


            const promise = controller.getSponsors.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/hvw/club',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new hvwController();


            const promise = controller.getClubs.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/hvw/club/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new hvwController();


            const promise = controller.getClub.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/hvw/games',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new hvwController();


            const promise = controller.getGames.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/hvw/ligue',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new hvwController();


            const promise = controller.getLigue.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/playerStatistics/league',
        function(request: any, response: any, next: any) {
            const args = {
                season: { "default": "2122", "in": "query", "name": "season", "dataType": "string" },
                league: { "default": "Bezirksliga", "in": "query", "name": "league", "dataType": "string" },
                gender: { "default": "Herren", "in": "query", "name": "gender", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new playerStatisticController();


            const promise = controller.getLeaguePlayerStatistic.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/playerStatistics/player/:playerName',
        function(request: any, response: any, next: any) {
            const args = {
                season: { "default": "2122", "in": "query", "name": "season", "dataType": "string" },
                league: { "default": "Bezirksliga", "in": "query", "name": "league", "dataType": "string" },
                gender: { "default": "Herren", "in": "query", "name": "gender", "dataType": "string" },
                playerName: { "in": "path", "name": "playerName", "required": true, "dataType": "any" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new playerStatisticController();


            const promise = controller.getPlayerStatistic.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/playerStatistics/team/:teamName',
        function(request: any, response: any, next: any) {
            const args = {
                season: { "default": "2122", "in": "query", "name": "season", "dataType": "string" },
                league: { "default": "Bezirksliga", "in": "query", "name": "league", "dataType": "string" },
                gender: { "default": "Herren", "in": "query", "name": "gender", "dataType": "string" },
                teamName: { "default": "TSV Willsbach", "in": "path", "name": "teamName", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new playerStatisticController();


            const promise = controller.getTeamStatistic.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });


    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
