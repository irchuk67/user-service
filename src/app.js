const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://users:users@localhost:27019/users');
const PORT = process.env.PORT || 7000;

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

/*
app.use(expressValidator());
*/

require('./model/User');
app.use(require('./route'));

app.listen(PORT, (error) => {
  if(!error) {
    console.log(`Server side is running on port ${PORT}`)
  } else {
    console.log("Error: ", error)
  }
})

module.exports = app;