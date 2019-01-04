const express = require("express");
const passport = require("passport");
const router = express.Router();

const keys = require("../../config/keys");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Issue = require("../../models/Issue");

const validateNewIssueInput = require("../../validation/newissue");
const validateNewCategoryInput = require("../../validation/newcategory");

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

/*
 * @route   POST api/issues/newCategory
 * @desc    Create a new category
 * @access  Private / Admin
 */

router.post("/newCategory", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateNewCategoryInput(req.body);

    User.findById(req.user.id)
        .then(user => {
            if (!user.isAdmin) return res.status(401).json({ error: "Unauthorized" });

            if (!isValid) return res.status(400).json(errors);

            Category.findOne({ name: { $regex: new RegExp("^" + req.body.name + "$", "i") } })
                .then(category => {
                    if (category) {
                        errors.title = "A category with this title already exists!";
                        return res.status(400).json(errors);
                    }

                    const newCategory = new Category({
                        name: req.body.name
                    });

                    newCategory
                        .save()
                        .then(newCategory => res.json(newCategory))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

module.exports = router;
