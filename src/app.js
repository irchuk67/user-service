const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
mongoose.connect('mongodb+srv://receipts:receipts@cluster0.kkfjbu2.mongodb.net/users?retryWrites=true&w=majority'/*process.env.MONGODB_URI_USERS || 'mongodb://users:users@localhost:27019/users'*/);
const PORT = process.env.PORT || 7000;

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());

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