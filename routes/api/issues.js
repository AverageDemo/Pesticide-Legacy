const express = require("express");
const passport = require("passport");
const router = express.Router();

const keys = require("../../config/keys");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Issue = require("../../models/Issue");

const validateNewIssueInput = require("../../validation/newissue");
const validateNewCommentInput = require("../../validation/newcomment");
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
 * @route   GET api/issues/:issueTag
 * @desc    View an issue
 * @access  Public
 */

router.get("/:issueTag", (req, res) => {
    Issue.findOne({ tag: { $regex: new RegExp("^" + req.params.issueTag + "$", "i") } })
        .then(issue => {
            if (!issue) {
                errors.issue = "Issue not found!";
                return res.status(404).json(errors);
            }

            res.json(issue);
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

/*
 * @route   POST api/issues/:issueTag/comment
 * @desc    Add a new comment to an issue
 * @access  Private
 */

router.post("/:issueTag/comment", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateNewCommentInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Issue.findOne({ tag: { $regex: new RegExp("^" + req.params.issueTag + "$", "i") } })
        .then(issue => {
            if (!issue) {
                errors.issue = "Issue not found!";
                return res.status(404).json(errors);
            }

            if (issue.isResolved) {
                errors.issue = "This issue is closed!";
                return res.status(400).json(errors);
            }

            const newComment = {
                value: req.body.value,
                author: req.user.id
            };

            issue.comments.unshift(newComment);

            issue
                .save()
                .then(issue => res.json(issue))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

/*
 * @route   POST api/issues/:issueTag/close
 * @desc    Mark an issue as solved
 * @access  Private / admin / developer
 */

router.post("/:issueTag/close", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            if (!user.isAdmin && !user.isDeveloper)
                return res.status(401).json({ error: "Unauthorized" });

            Issue.findOneAndUpdate(
                { tag: { $regex: new RegExp("^" + req.params.issueTag + "$", "i") } },
                { $set: { isResolved: true, devNotes: req.body.value } }
            )
                .then(issue => {
                    res.json(issue);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

module.exports = router;
