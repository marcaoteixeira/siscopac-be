class HomeController{

    async index(req, res){
        res.render("App.ejs");
    }

}

module.exports = new HomeController();