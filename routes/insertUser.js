const bcrypt=require('bcryptjs'); 
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
router.post('/insertRecord',(req,res)=>{
//Hash Password
if(req.body.userotp === req.body.otp)
{
const name = req.body.name;
const email = req.body.email;
const password = req.body.pass;
const newUser = new User({
    name,
    email,
    password
});
bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(newUser.password, salt, (err,hash) => {
        if (err) throw err;
        //Hashed Password
        newUser.password = hash;
        newUser.save()
            .then(user =>{
                req.flash('registered','You Are Now Registered And Can Log In');
                res.redirect('/User');
            })
            .catch(err => console.log(err));
    });
});
}
else
console.log("Wrong Otp");
});

module.exports = router;