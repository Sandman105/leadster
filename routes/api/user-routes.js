const router = require('express').Router();
const withAuth = require("../../middleware/authentication.js");

//Here is where we get all the functions from our controller because we obviously need to use them in the routes. We are just destructuring them inline
// const {
//     getAllPostings,
//     getPostingsSavedByUser,
//     getUsersFromSavedPosting,
//     createSubscription,
//     createUser,
//     createPosting,
//     deleteSubscription
// } = require('../../controllers/user-controller')

// // GET and POST at api/user
// router
//     .route("/")
//     .get(getAllPostings)
//     .get(getPostingsSavedByUser)
//     .get(getUsersFromSavedPosting)
//     .post(createSubscription)
//     .post(createUser)
//     .post(createPosting);

// //DELETE at /leadster/jobs/unsaved/:id
// router
//     .route('/:id')
//     .delete(deleteSubscription);


// module.exports = router;

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
    deletePosting,
    getUserProfile,
    login
} = require("../../controllers/user-controller");

router.route('/').get(withAuth, getUserProfile)

// 1. Login?
// "/login"
router.route("/login").post(login);


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
router.route("/jobs/unsaved/:id/:user").delete(deleteSubscription);

module.exports = router;
