const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const randString = require("randomstring");
const router = express.Router();

const isEmpty = require("../../validation/is-empty");
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

const keys = require("../../config/keys");
const User = require("../../models/User");

/*
 * @route   POST api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const username = req.body.username;

    try {
        const user = await User.find({
            $or: [
                { email: { $regex: new RegExp("^" + email + "$", "i") } },
                { username: { $regex: new RegExp("^" + username + "$", "i") } }
            ]
        });

        if (user) {
            user.forEach(thisUser => {
                if (!thisUser.email.localeCompare(email)) errors.email = "Email is already in use";
                if (!thisUser.username.localeCompare(username))
                    errors.username = "Username is already in use";
            });
        }

        if (!isEmpty(errors)) return res.status(400).json(errors);

        const newUser = new User({
            email,
            username,
            name: req.body.name,
            password: req.body.password,
            isVerified: true, // Remove this line when email verification is integrated fully.
            veriToken: randString.generate(10)
        });

        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;

                return newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    } catch (e) {
        next(e);
    }
});

/*
 * @route   POST api/users/login
 * @desc    Login user / return JWT
 * @access  Public
 */
router.post("/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const password = req.body.password;

    try {
        const user = await User.findOne({
            username: { $regex: new RegExp("^" + req.body.username + "$", "i") }
        });

        if (!user) {
            errors.username = "User not found";
            return res.status(404).json(errors);
        }

        bcryptjs.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                if (user.isVerified) {
                    const payload = {
                        id: user.id,
                        username: user.username
                    };

                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                } else {
                    errors.username = "Please confirm your email!";
                    res.status(400).json(errors);
                }
            } else {
                errors.password = "Incorrect password";
                res.status(400).json(errors);
            }
        });
    } catch (e) {
        next(e);
    }
});

/*
 * @route   GET api/users/activate
 * @desc    Activate a user
 * @access  Public
 */
router.get("/activate/:token", async (req, res) => {
    const veriToken = req.params.token;

    try {
        const user = await User.findOneAndUpdate(
            { veriToken },
            { $set: { isVerified: true, veriToken: null } }
        );

        if (!user) {
            return res.status(404).json({ msg: "Invalid token" });
        }

        res.json({ msg: "Account activated" });
    } catch (e) {
        next(e);
    }
});

/*
 * @route   GET api/users/iselevated
 * @desc    Checks if a user has elevated permissions
 * @access  Private
 */
router.get("/iselevated", passport.authenticate("jwt", { session: false }), (req, res) => {
    return req.user.isAdmin || req.user.isDeveloper ? res.json(true) : res.json(false);
});

module.exports = router;
