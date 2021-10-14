import { proxyService } from "../proxyService";

export class playerStatisticService extends proxyService {
    private uri = 'https://handballstatistiken.de/assets/utilities/getSpieler.php?Saison=2122&Bereich=Heilbronn-Franken&Liga=BezirksligaHerren';

   constructor(season = '2021', league = 'Bezirksliga', gender = 'Herren'){
       super();
        this.uri = `https://handballstatistiken.de/assets/utilities/getSpieler.php?Saison=${season}&Bereich=Heilbronn-Franken&Liga=${league}${gender}`;
    }
    public getStatistics () {
        this.options.uri = this.uri;
        return this.request
            .get(this.options)
            .then(response => {
                console.log(response);
                return response.aaData;
            });
    }

    public getPlayerStatistics (playerName) {
        this.options.uri = this.uri;
        return this.request
            .get(this.options)
            .then(response => {
                var players = response.aaData;
                players = players.filter(o => o['Name'] === playerName);
                var player = players[0];
                return player;
            });
    }

    public getTeamStatistics (teamName) {
        this.options.uri = this.uri;
        return this.request
            .get(this.options)
            .then(response => {
                var players = response.aaData;
                players = players.filter(o => o['Mannschaft'] === teamName);
                return players;
            });
    }
}