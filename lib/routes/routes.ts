/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { PlayerController } from './../controllers/playerController';
import { WpController } from './../controllers/wpController';
import { TeamController } from './../controllers/teamController';
import { hvwController } from './../controllers/hvwController';
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
    "Post": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "title": { "dataType": "string", "required": true },
            "excerpt": { "dataType": "string", "required": true },
            "content": { "dataType": "string", "required": true },
            "author": { "dataType": "string", "required": true },
            "date": { "dataType": "datetime", "required": true },
            "categories": { "dataType": "array", "array": { "ref": "Tag" } },
            "tags": { "dataType": "array", "array": { "ref": "Tag" } },
            "isNew": { "dataType": "boolean" },
            "modified": { "dataType": "datetime" },
            "sticky": { "dataType": "boolean" },
            "picture": { "ref": "Picture" },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
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
    app.get('/wp/posts',
        function(request: any, response: any, next: any) {
            const args = {
                page: { "in": "query", "name": "page", "dataType": "double" },
                category: { "in": "query", "name": "category", "dataType": "double" },
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
    app.get('/wp/media/teams',
        function(request: any, response: any, next: any) {
            const args = {
                archived: { "in": "query", "name": "archived", "dataType": "boolean" },
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
    app.get('/hvw/games',
        function(request: any, response: any, next: any) {
            const args = {
                periode: { "in": "query", "name": "periode", "dataType": "double" },
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
    app.get('/hvw/games/:id',
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

            const controller = new hvwController();


            const promise = controller.getGame.apply(controller, validatedArgs as any);
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
