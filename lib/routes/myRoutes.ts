import { TeamController } from './../controllers/teamController';
import { PlayerController } from './../controllers/playerController';
import { Request, Response } from "express";
import { WpController } from '../controllers/wpController';

export class Routes {

    private playerController: PlayerController = new PlayerController();
    private teamController: TeamController = new TeamController();
    private wpController: WpController = new WpController();


    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            });

        // app.route('/wp/posts')
        //     .get(this.wpController.getPosts);

        // app.route('/teams')
        //     .get(this.teamController.getTeams)
        //     .post(this.teamController.addNewTeam);

        // app.route('/teams/:teamId')
        //     .get(this.teamController.getSingleTeam);

        // app.route('/players')
        //     .get(this.playerController.getPlayers)
        //     .post(this.playerController.addNewPlayer);

        // app.route('/players/:playerId')
        //     .get(this.playerController.getSinglePlayer);
    }
}