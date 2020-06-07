const User = require('../model/User');

const insertUser = (data, password) => {
    const user = new User({
        username: data.username,
        email: data.email,
        password: password
    });

    return user.save();
};

// Search for user
const findOneUser = (data) => {
        return User.countDocuments(
            { $or: [{ username: data.username }, { email: data.email }] }
            )
            .then();
        
}

// Find one user by username
const findOneUserByUsername = (data) => {
    return User.findOne(
        { $or: [{ username: data.username }] }
        )
        .then();
    
}

const findOneUserById = userId => {
    return User.findById(userId);
}

module.exports = {
    insertUser: insertUser,
    findOneUser: findOneUser,
    findOneUserById: findOneUserById,
    findOneUserByUsername: findOneUserByUsername
};