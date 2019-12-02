const env = 'development'
const config = require("./knexfile")[env];
var knex = require("knex")(config);

// knex.raw("CREATE DATABASE IF NOT EXISTS leadster").then(() => {
//     knex.destroy();
//     config.connection.database = "leadster"
//     console.log("created database...updated config:\n");
//     console.log(config);
//     return knex = require('knex')(config);
// }).catch(err => {
//     console.log(err);
// });

module.exports = require('knex')(config);
