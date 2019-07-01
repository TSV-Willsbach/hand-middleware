import { proxyService } from "./proxyService";

export class hvwService extends proxyService {

    private uri = 'https://spo.handball4all.de/service/if_g_json.php'
    private tickerUri = 'http://spo.handball4all.de/service/ticker.html?appid=&token=';
    private reportUri = 'http://spo.handball4all.de/misc/sboPublicReports.php?sGID=';


    public getGames(period) {
        if (period === null) {
            period = '68';
        }
        this.options.uri = this.uri + '?c=60&cmd=pcu&og=3' + `&p=${period}`;


        return this.request.get(this.options);
    }

    public getGame(id) {
        return this.getLigue(id);
    }

    public getLigue(id) {
        this.options.uri = this.uri + `?ca=1&og=3&cmd=ps&cl=${id}`;
        return this.request.get(this.options);
    }

}