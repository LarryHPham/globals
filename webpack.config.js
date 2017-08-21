var path = require('path');
module.exports = {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

};
