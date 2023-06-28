const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const router = express.Router();
const User = require('../model/user.model');
const { authenticate } = require('../middleware/Auth');
const {City} = require('../model/city.model')



router.post('/register', async (req, res) => {

    const { username, password , city} = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      city
    });
    
    await user.save();
    
    res.send('Registration successful');
  });
  
  router.post('/addcity', async (req, res) => {

    const city = new City(req.body);
    city.save((err) => {
      if (err) {
        console.error(err);
        return;
      }
    await city.save();
    
    res.send(' successful add city');
  });


  router.post('/get_city', async (req, res) => {

    User.findOne({}).populate('city').exec((err, user) => {
        if (err) {
          console.error(err);
          return;
        }
  
        console.log(user);
        // Access user data and populated city data
      });
    
    res.json(user);
  });


  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      // Generate JWT token
      const token = jwt.sign({ sub: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    })(req, res, next);

  });

  router.post('/logout', authenticate, (req, res) => {

    const token = jwt.sign({ sub: req.user._id }, 'prakash123', { expiresIn: '1s' });
    res.json({ message: 'Logout successful' });
  });
  

  // Protected route
  router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Protected resource' });
  });




module.exports = router