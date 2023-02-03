const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    blocked: {
        type: Number,
        default: 0
    },
    blockedDate: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("User", userSchema)