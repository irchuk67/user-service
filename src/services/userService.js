
const mongoose = require("mongoose");
const User = mongoose.model('User');

function getUsers(){
    return User.find({});
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

function createUser(userToCreate){
    const newUser = new User({
        name: userToCreate.name,
        surname: userToCreate.surname,
        middleName: userToCreate.middleName,
        birthDate: userToCreate.birthDate,
        sex: userToCreate.sex,
        phoneNumber: userToCreate.phoneNumber,
        email: userToCreate.email,
        password: userToCreate.password,
        other: userToCreate.other
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
            user.other =  updatedUserData.other;

            return user.save();
        })
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUserData
}