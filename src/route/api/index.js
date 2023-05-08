const express = require('express');
const router = express.Router();

router.use('/users', require('./User_CRUD'))
router.use('/auth', require('./login'))


module.exports = router;