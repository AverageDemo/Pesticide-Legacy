const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const keys = require("./config/keys.js");

mongoose.set("useFindAndModify", false);
mongoose
    .connect(
        keys.mongoURI,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
