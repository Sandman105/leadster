const router = require('express').Router();

const { getAllPostings } = require("../../controllers/user-controller");

router.route("/").get(getAllPostings);

module.exports = router;