const knex = require("../knex");

const postingSchema = knex.schema.hasTable("posting").then(table => {
    if (!table) { //if table doesn't exist then create it
        return knex.schema.createTable("posting", table => {
            table.increments("id").primary(); //sets the primary key and auto increments it
            table.string("title", 50);
            table.string("description", 1000);
            table.integer("employerID").unsigned().references("users.id").onDelete("CASCADE"); //unsigned means only positive numbers
        }).then(() => {
            console.log("posting table created");
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        return console.log("posting table already exists...not creating it");
    }
});

module.exports = postingSchema;
