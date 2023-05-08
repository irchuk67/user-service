const express = require('express');
const router = express.Router();
const {getUsers, createUser, getUserById, deleteUser, updateUserData,} = require("../../services/userService")
const {NOT_FOUND, OK, NO_CONTENT} = require("../../constants/HTTPCodes");

router.get('/', async (req, res) => {
    let users = await getUsers();
    console.log(users)
    res.json(users).status(200);

});

router.get('/:userId', async (req, res) => {
    let user = await getUserById(req.params.userId);

    if(!user){
        res.status(NOT_FOUND).send('no user found')
    }else{
        res.status(OK).json(user)
    }
})

router.delete(`/:userId`, async (req, res) => {
    const isDeleted = await deleteUser(req.params.userId);
    console.log(isDeleted)
    if (!isDeleted){
        res.status(NOT_FOUND).send('no user found')
    }else{
        res.status(NO_CONTENT).send('deleted successfully')
    }
})

router.use(express.json());

router.post('/', async (req, res) => {
    const newUser = await createUser(req.body)
    return res.status(201).json(newUser);
});

router.put('/:userId', async (req, res) => {
    let updatedUser = await updateUserData(req.params.userId, req.body)
    console.log(updatedUser)
    if (updatedUser === null){
        res.status(NOT_FOUND).send('no user found')
    }else{
        res.status(OK).json(updatedUser)
    }
})
module.exports = router;
