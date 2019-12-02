const router = require('express').Router();

//Here is where we get all the functions from our controller because we obviously need to use them in the routes. We are just destructuring them inline
const {
    getAllPostings,
    getPostingsSavedByUser,
    getUsersFromSavedPosting,
    createSubscription,
    createUser,
    createPosting,
    deleteSubscription
} = require('../../controllers/user-controller')

// GET and POST at api/user
router
    .route("/")
    .get(getAllPostings)
    .get(getPostingsSavedByUser)
    .get(getUsersFromSavedPosting)
    .post(createSubscription)
    .post(createUser)
    .post(createPosting);

//DELETE at /api/user/:id
router
    .route('/:id')
    .delete(deleteSubscription);


module.exports = router;

