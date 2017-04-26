'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.HEROKU_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.HEROKU_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.HEROKU_MONGODB_DB_URL ||
            'mongodb://localhost/neppasal'
  },

  seedDB: true
};
