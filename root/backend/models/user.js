const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: false
    }
});

module.exports = User = model('user', userSchema);
