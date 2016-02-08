import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import settings from './config';
import swig from 'swig';
import APIRoutes from './api';
import APPRoutes from './router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from 'react-router';
import Match from 'react-router/lib/match'
import RoutingContext from 'react-router/lib/RoutingContext';
import routes from './app/routes';

import mongoose from 'mongoose';

// Connect to database
mongoose.connect(settings.MONGO_URL)

const PORT = process.env.PORT || 3000

let app = express();
app.use(express.static('public'));
app.use(morgan('dev')) // Use this for logging requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTING
let APIRouter = express.Router();
let APPRouter = express.Router();
APPRoutes(APPRouter);
APIRoutes(APIRouter);

// app.use('/', APPRouter);
app.use('/api', APIRouter);

app.use(function(req, res) {
  Match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(RoutingContext, renderProps));
        var page = swig.renderFile('public/html/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})
