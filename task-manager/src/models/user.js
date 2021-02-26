const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

// Virtual field. Not stored in the database.
userSchema.virtual('tasks', {
    // Name of model that this field is referencing.
    ref: 'Task',
    // Name of field on this model
    localField: '_id',
    // Name of field on other model
    foreignField: 'owner'
});

// Method accessible on the instance of a user model.
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');

    // Save authentication token to user.
    user.tokens = user.tokens.concat({token: token});
    await user.save();

    return token;
};

// Limit what is sent back to the user.
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

// Function to find user by email and password. Accessible on the user model.
userSchema.statics.findByCredentials = async (email, password) => {
    // Get user by email.
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error('Unable to login');
    }

    // Compare plain text password with stored hash.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

// Hash password before it is saved to the database. Middleware function.
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete user tasks when user is removed. Middleware function.
userSchema.pre('remove', async function (next) {
   const user = this;

   await Task.deleteMany({ owner: user._id });

   next();
});

// Create new user model with Mongoose.
const User = mongoose.model('User', userSchema);

module.exports = User;