const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Issue = require("../../models/Issue");

/*
 * @route   GET api/issues
 * @desc    View all issues
 * @access  Public
 */

router.get("/issues", (req, res) => {
    res.json({ msg: "k" });
});

module.exports = router;
