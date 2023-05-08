const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://users:users@localhost:27019/users');
const PORT = process.env.PORT || 7000;

app.use(cors({
  origin: '*'
}));

require('./models/User');
app.use(require('./routes'))
app.listen(PORT, (error) => {
  if(!error) {
    console.log(`Server side is running on port ${PORT}`)
  } else {
    console.log("Error: ", error)
  }
})

module.exports = app;