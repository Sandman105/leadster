const knex = require("../knex");

const ratingSchema = knex.schema.hasTable("rating").then(table => {
    if (!table) { //if table doesn't exist then create it
        return knex.schema.createTable("rating", table => {
            table.increments("id").primary(); //sets the primary key and auto increments it
            table.integer("userReviewerID").unsigned().references("users.id").onDelete('CASCADE').onUpdate('CASCADE'); //unsigned means only positive numbers
            table.integer("userRevieweeID").unsigned().references("users.id").onDelete('CASCADE').onUpdate('CASCADE'); //unsigned means only positive numbers
            table.integer("postID").unsigned().references("posting.id").onDelete('CASCADE').onUpdate('CASCADE');
            table.dateTime("timeAdded").defaultTo(knex.fn.now());
            table.float("rating");
            table.string("body", 1000);
        }).then(() => {
            console.log("rating table created");
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        return console.log("rating table already exists...not creating it");
    }
});

module.exports = ratingSchema;
