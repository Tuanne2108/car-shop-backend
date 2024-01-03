class newController {
    index(req, res) {
        res.render("home");
    }
}

module.exports = new newController();
