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
    getPostingById,
    deletePosting
 } = require("../../controllers/user-controller");

// 1. Login?
// "/login"


// 2. Signup to sumbit form
// "/signup"
router.route("/signup").post(createUser);

// -------------------------------------------

// Boss
// 3. Employer posts showing all the jobs a boss posts or create a new post
// "/employer/:id"
router.route("/employer/:id").get(getPostingByEmployer).post(createPosting);

// 4. Post detail showing job title, job description, who saved the posts, also delete post
// "/employer/posts/:id"
// "/employer/postsavers/:id"
router.route("/employer/posts/:id").get(getPostingById).delete(deletePosting);

router.route("/employer/postsavers/:id").get(getUsersFromSavedPosting);


// -------------------------------------------

// Seeker
// 6. Show all jobs from all employers
// "/jobs"
router.route("/jobs").get(getAllPostings);

// 7. Show all saved jobs
// "/jobs/saved/:id"
router.route("/jobs/saved/:id").get(getPostingsSavedByUser);

// 8. Seekers click save button
// "/jobs/saved/:id"
router.route("/jobs/saved/:id").post(createSubscription);

// 9. Unsave one job
//  "/jobs/unsave/:id"
router.route("/jobs/unsave/:id").delete(deleteSubscription);


module.exports = router;