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
        // knex("subscription").select("*").where('userID', req.params.id)
        let query = await (knex('subscription').join('posting', 'subscription.postID', '=', 'posting.id').select(knex.ref('posting.id').as('postID'), 'posting.title').where('userID', req.params.id));
        // console.log(query);
        return res.json(query);
    }
    catch (err) {
        console.log("err: ", err);
    }
};

//I'm proud of this one :') Peiyu is proud of Varun too!
async function getUsersFromSavedPosting(req, res) { //this will be for employers to view who saved their jobs
    try {
        await (knex("subscription").select("*").where('postID', req.params.id).then(async data => {
            let usersWhoSavedJob = data.map(user => user.userID);
            // console.log("look here for result:\n", data);
            // console.log("look here for result:\n", usersWhoSavedJob);
            let subQuery = await (knex('users').select("*").whereIn("id", usersWhoSavedJob));
            // console.log("subquery:\n" , subQuery);
            let dataToSend = subQuery.map(subQuery => ({
                nameFirst: subQuery.nameFirst,
                nameLast: subQuery.nameLast,
                email: subQuery.email,
                phoneNum: subQuery.phoneNum
            }))
            // console.log("data to send: ", dataToSend);
            return res.json(dataToSend);
        }).catch(err => {
            console.log('err: ', err);
            res.json(err);
        }));
    }
    catch (err) {
        console.log(err);
        return res.json(err);
    };
};

async function getPostingByEmployer(req, res) {
    // console.log("req: ", req);
    try {
        let query = await (knex("posting").select("*").where('employerID', req.params.id));
        return res.json(query);
    }
    catch (err) {
        return res.json(err);
    };
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

async function queryDB(req, res) {
    try {
        //ensure that url is /leadster/query/:query
        let query = await (knex('posting').select('*').where('title', 'like', `%${req.params.query}%`).orWhere('description', 'like', `%${req.params.query}%`));
        return res.json(query);
    } catch (err) {
        console.log('err: ', err);
        return res.json(err);
    }
}

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
    // console.log("User: ", req.params);
    // console.log("Post: ", req.params.id);
    // console.log(req);
    try {
        let query = await (knex("subscription").delete().where('postID', req.params.id).andWhere('userID', req.params.user));
        // console.log("query: ", knex("subscription").delete().where('postID', req.params.id).andWhere('userID', req.params.user));
        // console.log("result: ", query);
        return res.json(query);
    } catch (err) {
        console.log("err: ", err);
    };
};

const createUser = (req, res) => {
    // console.log("req: ", req.body);
    knex("users").insert(
        [
            {
                nameFirst: req.body.firstName,
                nameLast: req.body.lastName,
                isEmployer: req.body.isEmployer,
                phoneNum: req.body.phoneNum,
                email: req.body.email,
                password: hashPassword(req.body.password),
                companyName: req.body.companyName
            }
        ]
    )
        .then(data => {
            // knex.destroy();
            // console.log(data);
            return res.json(data);
        })
        .catch(err => {
            return res.json(err);
        });
};

async function createPosting(req, res) {
    // console.log("req params: ", req.params.id);
    // console.log("req: ", req);
    try {
        let query = await (knex("posting").insert(
            [
                {
                    title: req.body.title,
                    description: req.body.description,
                    employerID: req.params.id
                }
            ]
        ));
        return res.json(query);
    }
    catch (err) {
        res.json(err);
    }
};

async function deletePosting(req, res) {
    console.log("delete req: ", req.params.id);
    try {
        
        let query = await (knex("subscription").where('postID', req.params.id).del().then(async data => {
            // console.log("data: ", data);
            let subQuery = await (knex("posting").where('id', req.params.id).del());
            // console.log("subQuery: ", subQuery)
            return res.json(query);
        }));
        // console.log("query: ", query);
    }
    catch (err) {
        console.log("err: ", err);
        return res.json(err);
    }
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
        // console.log(findUserErr);
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
    deletePosting,
    queryDB
};
