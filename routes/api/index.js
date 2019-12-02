const router = require('express').Router();
const userRoutes = require('./user-routes');
// define routes and they will be prefixed with whatever you put in the argument for router.use

const { 
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromSavedPosting,
    createSubscription,
    createUser,
    createPosting,
    deleteSubscription,
    getPostingByEmployer,
    setPostingById
 } = require("../../controllers/user-controller");


// 1. Login
// "/login"

// 2. Signup
// "/signup"

// Boss
// 3. Employer posts showing all the jobs a boss posts
// "/employerposts"
router.route("/employerposts").get(getPostingByEmployer);

// 4. Post detail showing job title, job description, who saved the posts
// "/postdetails"
router.route("/postdetails").get(setPostingById);

// Seeker
// 4. Job List
// "/jobs"

module.exports = router;