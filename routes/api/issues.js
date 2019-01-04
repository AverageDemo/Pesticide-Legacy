const express = require("express");
const passport = require("passport");
const router = express.Router();

const keys = require("../../config/keys");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Issue = require("../../models/Issue");

const validateNewIssueInput = require("../../validation/newissue");

/*
 * @route   GET api/issues
 * @desc    View all issues
 * @access  Public
 */

router.get("/", (req, res) => {
    res.json({ msg: "k" });
});

/*
 * @route   POST api/issues/newIssue
 * @desc    Create a new issue
 * @access  Private
 */

router.post("/newIssue", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateNewIssueInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Issue.countDocuments()
        .then(count => {
            const newIssue = new Issue({
                name: req.body.name,
                tag: `${keys.issuePrefix}${count}`,
                description: req.body.description,
                reproduction: req.body.reproduction,
                category: req.body.category
            });

            newIssue
                .save()
                .then(newIssue => res.json(newIssue))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// This is strictly for test. It will be restricted in the future.
router.post("/newCategory", (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    });

    newCategory
        .save()
        .then(newCategory => res.json(newCategory))
        .catch(err => console.log(err));
});

module.exports = router;
