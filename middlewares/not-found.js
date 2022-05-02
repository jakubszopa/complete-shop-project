const res = require("express/lib/response")

function notFoundHandler(req, res) {
    res.render('shared/404');
}

module.exports = notFoundHandler;