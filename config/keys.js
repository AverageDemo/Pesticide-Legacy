module.exports = {
    mongoURI: "mongodb://localhost:27017/bugtracker",
    secretOrKey: "secret",
    port: process.env.PORT || 5000,
    issuePrefix: "BT-"
};
