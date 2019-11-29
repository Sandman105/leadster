const knex = require("../knex");

const userSchema = knex.schema.hasTable("users").then(table => {
    if (!table) { //if table doesn't exist then create it
        return knex.schema.createTable("users", table => {
            table.increments("id").primary(); //sets the primary key and auto increments it
            table.string("nameFirst", 30);
            table.string("nameLast", 30);
            table.integer("isEmployer");
            table.string("phoneNum");
            table.string("email");
            table.string("password");
            table.string("companyName", 30);
        }).then(() => {
            console.log("users table created");
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        return console.log("users table already exists...not creating it")
    }
});

module.exports = userSchema;
