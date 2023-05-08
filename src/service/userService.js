const mongoose = require("mongoose");
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

function getUsers(){
    return User.find({});
}

async function existsByEmail({email}){
    const usersWithSameEmail = await findByEmail(email)
    return usersWithSameEmail.length !== 0;
}

async function existsByPhoneNumber({phoneNumber}){
    let usersWithSameNumber =  await User.find({phoneNumber: phoneNumber});
    return usersWithSameNumber.length !== 0;
}

function findByEmail(email) {
    return User.find({email: email});
}

function getUserById(id){
    return User.findById(id)
}

function deleteUser(id){
    return User.findById(id).then(response => {
        if (!response) return null;
        else {
            return User.deleteOne(response)
                .catch(err => console.log(err))
        }
    })
}

async function encryptPassword(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

async function createUser(userToCreate){
    let encrPassw = await encryptPassword(userToCreate.password);
    const newUser = new User({
        name: userToCreate.name,
        surname: userToCreate.surname,
        middleName: userToCreate.middleName,
        birthDate: userToCreate.birthDate,
        sex: userToCreate.sex,
        phoneNumber: userToCreate.phoneNumber,
        email: userToCreate.email,
        password: encrPassw,
    })

    return newUser.save();
}

function updateUserData(id, updatedUserData){
    return User.findById(id)
        .then(user => {
            if(!user) return null;
            user.name =  updatedUserData.name ;
            user.surname =  updatedUserData.surname ;
            user.middleName =  updatedUserData.middleName ;
            user.birthDate =  updatedUserData.birthDate ;
            user.sex =  updatedUserData.sex ;
            user.phoneNumber =  updatedUserData.phoneNumber ;
            user.email =  updatedUserData.email ;
            user.password =  updatedUserData.password ;

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