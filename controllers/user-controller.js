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

const getPostingsSavedByUser = (req, res) => {
    knex.select("*").from("subscription").where(`userID = ${req.params.id}`) //ensure that the id is passed into the url such as /api/userSavedPosting/{userid} or something similar
        //this id should be saved in the localstorage or session storage after login of user:
        // sessionStorage.setItem({
        //     userid: "82"
        // }); 
        // sessionStorage.getItem("userid");
        .then(data => {
            res.json(data); //can make another api call in here to get the name of the posting instead of just the id 
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
};

const getUsersFromPosting = (req, res) => {
    knex.select("*").from("subscription").where(`postingID = ${req.params.id}`) //ensure that the id is passed into the url such as /api/userSavedPosting/{userid} or something similar
    .then(data => {
        res.json(data); //can make another api call in here to get the user info 
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    });
}

module.exports = {
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromPosting
};
