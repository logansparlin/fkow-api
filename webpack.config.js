var jeet = require('jeet');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
  entry: './app/app.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader?paths[]=public'
      }
    ]
  },
  stylus:{
    use: [jeet(),rupture(),autoprefixer()]
  }
}
