const express = require('express');
const router = express.Router();

router.use('/users', require('./User_CRUD'))


module.exports = router;