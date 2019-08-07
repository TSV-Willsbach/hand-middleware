import { Game, Ligue, Score, Club } from './../models/hvwModel';
import { proxyService } from "./proxyService";
import { hvwConvertions } from "./hvw/hvwConvertions";

export class hvwService extends proxyService {

    protected uri = 'https://spo.handball4all.de/service/if_g_json.php'
    protected tickerUri = 'http://spo.handball4all.de/service/ticker.html?appid=&token=';
    protected reportUri = 'http://spo.handball4all.de/misc/sboPublicReports.php?sGID=';
    protected hvwConv: hvwConvertions;

    constructor() {
        super();
        this.hvwConv = new hvwConvertions();
    }

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
            period = '83';
        }
        this.options.uri = this.uri + '?c=60&cmd=pcu&og=3' + `&p=${period}`;

        return this.request
            .get(this.options)
            .then(response => {
                let club: Club;
                club = this.hvwConv.mapClub(response[0]);
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
                ligue = this.hvwConv.mapLigue(response[0]);
                return ligue;
            });
    }
}