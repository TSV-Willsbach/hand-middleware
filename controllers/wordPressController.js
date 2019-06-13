const request = require('request');


const uri = 'https://wp.willsbach-handball.de/wp-json/wp/v2/'

exports.getPosts = (req, res, next) => {
    var path = uri + 'posts/' + `?_embed`;

    if (req.query.page != undefined) {
        path = path + `&page=${req.query.page}`;
    }
    const user = request.get(path, {
        json: true
    }, function (error, response, body) {
        res.json(body);
    });

}