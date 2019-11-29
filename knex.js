const env = 'development'
const config = require("./knexfile")[env];
module.exports = require('knex')(config);
