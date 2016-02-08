import Recipe from './app/models/recipe';
import Merch from './app/models/merch';

let APIRoutes = function(app) {

  // Set Content-Type header for all api routes
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next()
  })

  // Get Recipes
  app.route('/recipes')
  .get(function(req, res) {
    Recipe.find((err, recipes) => {
      if(err)
        res.send(err);

      res.send(JSON.stringify(recipes, null, 3))
  })
  });

  // Get Merch
  app.route('/merch')
  .get(function(req, res) {
    Merch.find((err, merch) => {
      if(err)
        res.send(err);

      res.send(JSON.stringify(merch, null, 3))
  })
  })

}

export default APIRoutes;
