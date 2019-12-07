const { Users, Posting, Subscription } = require("../models");
const knex = require("../knex");
const bcrypt = require("bcrypt");
const handle = require("../utils/promise-handler.js");
const jwt = require("jsonwebtoken");
const secret = "DRqjrk2hnhbg9ngt@1!"

const getAllPostings = (req, res) => {
    knex.select("*").from("posting")
        .then(data => {
            //knex.destroy();
            return res.json(data);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
};

async function getPostingsSavedByUser(req, res) {
    try {
        // console.log("controller req: ", req.params.id);
        let query = await (knex("subscription").select("*").where('userID', req.params.id));
        // console.log(query);
        return res.json(query);
    }
    catch (err) {
        console.log("err: ", err);
    }
};

const getUsersFromSavedPosting = (req, res) => { //this will be for employers to view who saved their jobs
    knex.select("*").from("subscription").where('postingID', req.params.id) //ensure that the id is passed into the url such as /api/userSavedPosting/{userid} or something similar
        .then(data => {
            // knex.destroy();
            return res.json(data); //can make another api call in here to get the user info 
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
};

const getPostingByEmployer = (req, res) => {
    // console.log(`look here peiyu = ${req.params.id}`);
    knex("posting").select("*").where('employerID', req.params.id)
        .then(data => {
            // knex.destroy();
            // console.log(`look here 2 peiyu = ${data}`);
            return res.json(data);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
};

const getPostingById = (req, res) => {
    knex.select("*").from("posting").where('id', req.params.id)
        .then(data => {
            // knex.destroy();
            return res.json(data);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
};

async function createSubscription(req, res) {
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req);
    try {
        let query = await (knex("subscription").insert(
            [
                {
                    userID: req.body.userID,
                    postID: req.body.postID
                }
            ]
        ));
        // console.log("query: ", query);
        return res.json(query);
    } catch (err) {
        console.log("err: ", err);
    };
};

async function deleteSubscription(req, res) {
    console.log("User: ", req.params);
    console.log("Post: ", req.params.id);
    // console.log(req);
    try {
        let query = await (knex("subscription").delete().where('postID', req.params.id).andWhere('userID', req.params.user));
        // console.log("query: ", knex("subscription").delete().where('postID', req.params.id).andWhere('userID', req.params.user));
        console.log("result: ", query);
        return res.json(query);
    } catch (err) {
        console.log("err: ", err);
    };
};

const createUser = (req, res) => {
    knex("users").insert(
        [
            {
                nameFirst: req.body.firstName,
                nameLast: req.body.lastName,
                isEmployer: req.body.isemployer,
                phoneNum: req.body.phoneNum,
                email: req.body.email,
                password: hashPassword(req.body.password),
                companyName: req.body.companyName
            }
        ]
    ).returning("*")
        .then(data => {
            // knex.destroy();
            console.log(data);
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
            // knex.destroy();
            return res.json(data);
        })
        .catch(err => {
            return res.json(err);
        });
};

const deletePosting = (req, res) => {
    knex("posting").where('id', req.params.id).del() //need cascading delete here
        .then(data => {
            // knex.destroy();
            return res.json(data);
        })
        .catch(err => {
            return res.json(err);
        });
};

//TODO: update this so that you delete from subscription when give a userid and postid
// async function deleteSubscription(req, res) {
//     console.log("user: ", req.params);
//     console.log("post: ", req.params.id);
//     try {
//         let query = await (knex("subscription").where({
//             userID: req.body.userID,
//             postID: req.params.id
//         }).del()); //this may not work bc it will say reference key error
//         return res.json(query);
//     }
//     catch (err) {
//         console.log("err: ", err);
//     }
// };

// function for logging in a user
// this will run when user POSTs to '/api/user/login'
const login = async (req, res) => {
    const { email, password } = req.body;
    const [findUserErr, userInfo] = await handle(knex("users").select("*").where('email', email));

    if (findUserErr) {
        console.log(findUserErr);
        res.status(500).json({
            error: 'Internal error, try again'
        });
    } else if (!userInfo) {
        res.status(401).json({
            error: 'Incorrect email',
            message: 'incorrect email'
        });
    } else {
        const [pwErr, same] = await handle(validatePassword(password, email))

        if (pwErr) {
            res.status(500).json({
                error: "Internal Err, try again"
            });
        } else if (!same) {
            return res.status(401).send({
                error: 'incorrect password'
            });
        } else {
            const payload = {
                id: userInfo.id,
                email: userInfo.email
            };
            const token = jwt.sign(payload, secret, {
                expiresIn: '2h'
            });
            // console.log(userInfo);
            res.status(200).json({
                token,
                userInfo: {
                    isEmployer: userInfo[0].isEmployer, userId: userInfo[0].id
                }
            }); //ensure the front-end sets the token in the session storage with the name 'accessToken'
        }
    }
};

// get user profile
// GET '/leadster/' (this will be run through auth middleware)
const getUserProfile = async (req, res) => {
    const [userErr, userProfile] = await handle(knex("users").select("*").where('id', req.id));

    if (userErr) {
        res.status(500).json(userErr);
    } else {
        res.status(200).json(userProfile);
    }
};

//pwd is what the user passes in
async function validatePassword(pwd, email) {
    try {
        const result = await (knex("users").select("*").where('email', email));
        // console.log("test: ", result[0].password);
        return new Promise((resolve, reject) => {
            bcrypt.compare(pwd, result[0].password, (err, same) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(same);
                }
            });
        });
    }
    catch (err) {
        console.log("err: ", err);
    }

}

function hashPassword(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
}

module.exports = {
    login,
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromSavedPosting,
    getPostingByEmployer,
    getPostingById,
    getUserProfile,
    createSubscription,
    createUser,
    createPosting,
    deleteSubscription,
    deletePosting
};
