const mongoose = require('mongoose');

// Create Task model.
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // add a reference field to the User mongoose model.
        ref: 'User'
    }
});

module.exports = Task;