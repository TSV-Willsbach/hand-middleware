const request = require('request');
const globalController = require('./globalController');

const uri = 'https://spo.handball4all.de/service/if_g_json.php'
const tickerUri = 'http://spo.handball4all.de/service/ticker.html?appid=&token=';
const reportUri = 'http://spo.handball4all.de/misc/sboPublicReports.php?sGID=';

exports.getGames = (req, res, next) => {
    var path = uri + '?c=60&cmd=pcu&og=3';
    const period = req.query.id || '68'
    path = path + `&p=${period}`;

    request.get(path, {
        json: true
    }, function (error, response, body) {
        res.json(body);
    });
}

exports.getGame = (req, res, next) => {
    const id = req.params.id;
    const hostName = globalController.getHostname(req);

    request.get(`${hostName}/api/hvw/ligue/?id=${id}`, {
        json: true
    }, function (error, response, body) {
        res.json(body);
    });
}

exports.getLigue = (req, res, next) => {
    if (req.query.id === undefined) {
        res.status(422).send(`Parameter 'id' missing`);
        return;
    }
    var path = uri + `?ca=1&og=3&cmd=ps&cl=${req.query.id}`;

    request.get(path, {
        json: true
    }, function (error, response, body) {
        res.json(body);
    });
}