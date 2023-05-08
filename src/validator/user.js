const { body, validationResult} = require('express-validator')
const {existsByEmail, existsByPhoneNumber} = require("../service/userService");

const userValidator = (method) => {
    switch (method) {
        case 'createUser':
        case 'updateUser': {
            return [
                body('name', 'name doesn`t exists').exists(),
                body('surname', 'surname doesn`t exists').exists(),
                body('middleName', 'middleName doesn`t exists').exists(),
                body('birthDate', 'birthdate doesn`t exists').exists(),
                body('sex', 'sex doesn`t exists').exists(),
                body('phoneNumber', 'no phone number entered').exists().isMobilePhone(),
                body('email', 'Invalid email').exists().isEmail(),
                body('password', 'Invalid password').exists().isStrongPassword(),
            ]
        }
    }
}

const validateUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return false;
    }


    let existWithEmail = await existsByEmail(req.body);
    if(existWithEmail){
        res.status(409).send('User with such email exists');
        return false;
    }

    let existWithPhoneNumber = await existsByPhoneNumber(req.body);
    if(existWithPhoneNumber){
        res.status(409).send('User with such phone number exists');
        return false;
    }

    return true;
}

module.exports = {userValidator, validateUser}

