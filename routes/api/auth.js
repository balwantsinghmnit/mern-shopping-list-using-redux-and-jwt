// @ts-ignore
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User.js");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth.js");
//login
router.post('/',async(req,res)=>{
    const {email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({msg:'User not registered'});

      bcrypt.compare(password,user.password)
      .then(isMatch=>{
          if(!isMatch)
          return res.status(400).json({msg:"Invalid Credentials"});
          jwt.sign(
              {id:user.id},
              config.get('jwtSecret'),
              {expiresIn:3600},
              (err,token)=>{
                  if(err) throw err;
                  res.json({
                      token,
                      user:{
                          id:user.id,
                          name:user.name,
                          email:user.email
                      }
                  });
              }
          )
      });
 });

 //@route GET api/auth/user
 //@desc Get user data
 //@access Private

 router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
 });
module.exports = router;