const router = require('express').Router();
const userRoutes = require('./user-routes');
// define routes and they will be prefixed with whatever you put in the argument for router.use

//Commented line 6 and 8 out since I created the user-routes.js file, but this might need to change. Will speak with Varun.

//const { getAllPostings } = require("../../controllers/user-controller");

//router.route("/").get(getAllPostings);

router.use('/user', userRoutes)

module.exports = router;