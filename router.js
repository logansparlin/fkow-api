let APPRoutes = function(app) {
  app.get('/', function(req, res) {
    res.send("This will be the home page")
  });
}

export default APPRoutes;
