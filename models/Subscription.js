const knex = require("../knex");

const subscriptionSchema = knex.schema.hasTable("subscription").then(table => {
    if (!table) { //if table doesn't exist then create it
        return knex.schema.createTable("subscription", table => {
            table.increments("id").primary(); //sets the primary key and auto increments it
            table.integer("userID").unsigned().references("users.id"); //unsigned means only positive numbers
            table.integer("postingID").unsigned().references("posting.id");
            table.dateTime("timeAdded").defaultTo(knex.fn.now());
        }).then(() => {
            console.log("subscription table created");
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        return console.log("subscription table already exists...not creating it");
    }
});

module.exports = subscriptionSchema;