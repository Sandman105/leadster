const { Users, Posting, Subscription } = require("../models");
const knex = require("../knex");

const getAllPostings = (req, res) => {
    knex.select("*").from("posting")
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
};

module.exports = {
    getAllPostings
};
