const express = require('express');
const {findByEmail} = require("../../service/userService");
const {NOT_FOUND, OK} = require("../../constants/HTTPCodes");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const router = express.Router();

router.post('/', async (req, res) => {
    const users = await findByEmail(req.body.email);
    const user = users[0];
    console.log(user)
    if (!user) {
        res.status(401).send('no user with such email');
        return
    }

    console.log(user.password);
    console.log(req.body.password);

    const result = await bcrypt.compare(req.body.password, user.password);
    console.log(result)
    if(!result){
        res.status(401).send('password is incorrect');
        return;
    }

    let token;
    try{
        let secretKey = 'ghgvf6tgytytytvyftgyb7tv6rfr6r6f6tb';
        token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                roles: user.roles
            },
            secretKey,
            {expiresIn: "1y"}
        )
    }catch (err){
        console.log("Error", err);
        res.status(500);
    }

    res.status(200).json({
        token
    })
})

module.exports = router;

