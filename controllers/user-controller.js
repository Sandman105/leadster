const { Users, Posting, Subscription } = require("../models");
const knex = require("../knex");

const getAllPostings = (req, res) => {
    knex.select("*").from("posting")
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
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
            return res.json(data); //can make another api call in here to get the name of the posting instead of just the id 
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
};

const getUsersFromSavedPosting = (req, res) => { //this will be for employers to view who saved their jobs
    knex.select("*").from("subscription").where(`postingID = ${req.params.id}`) //ensure that the id is passed into the url such as /api/userSavedPosting/{userid} or something similar
        .then(data => {
            return res.json(data); //can make another api call in here to get the user info 
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
}

const createSubscription = (req, res) => {
    knex("subscription").insert(
        [
            {
                userID: req.body.userID,
                postingID: req.body.postingID
            }
        ]
    ).returning("*")
        .then(
            data => {
                return res.json(data);
            }
        ).catch(err => {
            return res.json(err);
        });
};

const createUser = (req, res) => {
    knex("users").insert(
        [
            {
                nameFirst: req.body.nameFirst,
                nameLast: req.body.nameLast,
                isEmployer: req.body.isEmployer,
                phoneNum: req.body.phoneNum,
                email: req.body.email,
                password: req.body.password,
                companyName: req.body.companyName
            }
        ]
    ).returning("*")
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.json(err);
        });
};

const createPosting = (req, res) => {
    knex("posting").insert(
        [
            {
                title: req.body.title,
                description: req.body.description,
                employerID: req.body.employerID
            }
        ]
    ).returning("*")
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.json(err);
        });
};

const deleteSubscription = (req, res) => {
    knex("subscription").where("id", req.body.id).del() //this may not work bc it will say reference key error
        .then(data => {
            return res.json(data);
        })
        .catch(err => {
            return res.json(err);
        });
};

module.exports = {
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromSavedPosting,
    createSubscription,
    createUser,
    createPosting,
    deleteSubscription
};
