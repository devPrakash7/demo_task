
const express = require('express');
const passport = require('passport');
const app = express();
const mongoose = require('mongoose')
require("./controller/rout")



app.use(express.json());
app.use(passport.initialize());

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:akki909@cluster0.bvfvlii.mongodb.net/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


app.listen(port, () => console.log(`Example app listening on port ${port}!`))