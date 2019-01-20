const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DevGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    projects: [
        {
            projectID: {
                type: Schema.Types.ObjectId,
                ref: "projects"
            }
        }
    ],
    users: [
        {
            userID: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = DevGroup = mongoose.model("devgroups", DevGroupSchema);
