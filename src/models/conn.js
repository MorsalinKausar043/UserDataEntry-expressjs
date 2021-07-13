const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true,
        trim: true,
        minlangth: [2, "invalid your name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
            {
                throw new Error("invalid your email")
            }
        }
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min: [10, 'invalid your numebr']
    },
    massage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default : Date.now
    }
});

const UserData = new mongoose.model("UserData", UserSchema);

module.exports = UserData;