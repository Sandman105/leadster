const env = process.env.NODE_ENV || 'development';
const config = require("./knexfile")[env];
// var knex = require("knex")(process.env.JAWSDB_URL || config);

module.exports = require("knex")(config);;
