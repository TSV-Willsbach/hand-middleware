exports.getHostname = function (req) {
    var hostName;
    var host = req.headers.host;
    if (host.indexOf('localhost') > -1) {
        hostName = `http://${host}`;
    } else {
        hostName = `https://${host}`;
    }
    return hostName;
}