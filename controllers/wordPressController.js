const request = require('request');
const globalController = require('./globalController');

const uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/'

exports.getPosts = (req, res, next) => {
    var path = uri + 'posts/' + `?_embed`;

    if (req.query.page != undefined) {
        path = path + `&page=${req.query.page}`;
    }

    if (req.query.category != undefined) {
        path = path + `&categories=${req.query.category}`;
    }

    request.get(path, {
        json: true
    }, function (error, response, body) {
        res.json(body);
    });

}

exports.getReports = (req, res, next) => {
    const hostName = globalController.getHostname(req);

    request.get(`${hostName}/api/wp/posts?category=6`, {
        json: true
    }, function (error, response, body) {
        res.json(body);
    });
}