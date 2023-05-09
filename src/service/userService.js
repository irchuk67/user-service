const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

function getUsers() {
    return User.find({});
}

async function existsByEmail({email}, userId) {
    const usersWithSameEmail = await findByEmail(email);
    if (usersWithSameEmail.length > 0) {
        if (usersWithSameEmail[0]._id.toString() === userId) {
            return false;
        }
    }
    return usersWithSameEmail.length !== 0;
}

async function existsByPhoneNumber({phoneNumber}, userId) {
    let usersWithSameNumber = await User.find({phoneNumber: phoneNumber});
    console.log(usersWithSameNumber[0]._id);
    console.log(userId);
    if(usersWithSameNumber.length > 0){
        if (usersWithSameNumber[0]._id.toString() === userId) {
            return false;
        }
    }
    return usersWithSameNumber.length !== 0;
}

function findByEmail(email) {
    return User.find({email: email});
}

function getUserById(id) {
    return User.findById(id)
}

function deleteUser(id) {
    return User.findById(id).then(response => {
        if (!response) return null;
        else {
            return User.deleteOne(response)
                .catch(err => console.log(err))
        }
    })
}

async function encryptPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

async function createUser(userToCreate) {
    let encryptedPassword = await encryptPassword(userToCreate.password);
    const newUser = new User({
        name: userToCreate.name,
        surname: userToCreate.surname,
        middleName: userToCreate.middleName,
        birthDate: userToCreate.birthDate,
        sex: userToCreate.sex,
        roles: userToCreate.roles,
        phoneNumber: userToCreate.phoneNumber,
        email: userToCreate.email,
        password: encryptedPassword,
    })

    return newUser.save();
}

function updateUserData(id, updatedUserData) {
    return User.findById(id)
        .then(user => {
            if (!user) return null;
            user.name = updatedUserData.name;
            user.surname = updatedUserData.surname;
            user.middleName = updatedUserData.middleName;
            user.birthDate = updatedUserData.birthDate;
            user.sex = updatedUserData.sex;
            user.phoneNumber = updatedUserData.phoneNumber;
            user.email = updatedUserData.email;
            user.password = updatedUserData.password;
            user.roles = updatedUserData.roles;

            return user.save();
        })
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUserData,

    existsByEmail,
    existsByPhoneNumber,
    findByEmail
}