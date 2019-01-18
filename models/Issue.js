const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    reproduction: {
        type: String,
        required: false
    },
    stackTrace: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "projects",
        default: null
    },
    github: {
        pullRequest: {
            type: String,
            required: false
        },
        solution: {
            type: String,
            required: false
        }
    },
    devNotes: {
        type: String,
        required: false
    },
    comments: [
        {
            value: {
                type: String,
                required: true
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isPrivate: {
        type: Boolean,
        default: false
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    dateResolved: {
        type: Date
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Issue = mongoose.model("issues", IssueSchema);
