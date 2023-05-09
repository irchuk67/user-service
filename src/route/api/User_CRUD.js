const express = require('express');
const router = express.Router();
const {getUsers, createUser, getUserById, deleteUser, updateUserData, existsByEmail, existsByPhoneNumber,} = require("../../service/userService")
const {NOT_FOUND, OK, NO_CONTENT} = require("../../constants/HTTPCodes");
const {userValidator, validateUser} = require("../../validator/user");
const verifyToken = require('../../middleware/tokenValidator')

router.get('/', verifyToken, async (req, res) => {
    if(!req.user) {
        return;
    }
    let users = await getUsers();

    if(!users) {
        res.status(NOT_FOUND).send('no users found');
        return;
    }

    users.map(user => {
        return {
            name: user.name,
            surname: user.surname,
            middleName: user.middleName,
            birthDate: user.birthDate,
            sex: user.sex,
            phoneNumber: user.phoneNumber,
            email: user.email
        }
    })
        res.json(users).status(200);

});

router.get('/:userId',verifyToken,  async (req, res) => {
    if(!req.user) {
        return;
    }

    let user = await getUserById(req.params.userId);

    if(!user){
        res.status(NOT_FOUND).send('no user found');
        return;
    }

    let userToSend = {
        name: user.name,
        surname: user.surname,
        middleName: user.middleName,
        birthDate: user.birthDate,
        sex: user.sex,
        phoneNumber: user.phoneNumber,
        email: user.email
    }
    res.status(OK).json(userToSend)

})

router.delete(`/:userId`, verifyToken, async (req, res) => {
    if(!req.user) {
        return;
    }

    const isDeleted = await deleteUser(req.params.userId);
    if (!isDeleted){
        res.status(NOT_FOUND).send('no user found')
    }else{
        res.status(NO_CONTENT).send('deleted successfully')
    }
})

router.use(express.json());

router.post('/', userValidator('createUser'),async (req, res) => {
    const isValid = await validateUser(req, res);
    if(!isValid){
        return;
    }

    const newUser = await createUser(req.body)
    return res.status(201).json(newUser._id);
});

router.put('/:userId', verifyToken, userValidator('updateUser'), async (req, res) => {
    if(!req.user) {
        return;
    }

   const isValid = await validateUser(req, res);
    if(!isValid){
        return;
    }
    let updatedUser = await updateUserData(req.params.userId, req.body);
    if (updatedUser === null){
        res.status(NOT_FOUND).send('no user found');
        return
    }
    let user = {
        name: updatedUser.name,
        surname: updatedUser.surname,
        middleName: updatedUser.middleName,
        birthDate: updatedUser.birthDate,
        sex: updatedUser.sex,
        phoneNumber: updatedUser.phoneNumber,
        email: updatedUser.email,
        roles: updatedUser.roles
    }
    res.status(OK).json(user)
})
module.exports = router;
