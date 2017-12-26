const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect('mongodb://crawler-bilibili:m3745055@ds143892.mlab.com:43892/crawler-bilibili');
  // plug in the promise library:
  mongoose.Promise = global.Promise;


  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
  require('./medicalrequest');
};

