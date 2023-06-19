const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

async function getUsersByIds(idsStr, role) {
    const ids = idsStr.split(",");

    const usersByIds = await User.find({
        '_id':{
            $in: ids
        },
        roles: [role]
    })
    return usersByIds;
}

async function existsByEmail(operation, {email}, userId) {
    const usersWithSameEmail = await findByEmail(email);
    if (operation === 'PUT' && usersWithSameEmail.length > 0) {
        if (usersWithSameEmail[0]._id.toString() === userId) {
            return false;
        }
    }
    return usersWithSameEmail.length !== 0;
}

async function existsByPhoneNumber(operation, {phoneNumber}, userId) {
    let usersWithSameNumber = await User.find({phoneNumber: phoneNumber});
    if(operation === 'PUT' && usersWithSameNumber.length > 0){
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

async function updateUserData(id, updatedUserData) {
    let encryptedPassword = await encryptPassword(updatedUserData.password);

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
            user.password = encryptedPassword;
            user.roles = updatedUserData.roles;

            return user.save();
        })
}

module.exports = {
    getUsersByIds,
    createUser,
    getUserById,
    deleteUser,
    updateUserData,

    existsByEmail,
    existsByPhoneNumber,
    findByEmail
}