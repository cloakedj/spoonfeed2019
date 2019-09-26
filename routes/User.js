const express=require('express');
const route=express.Router();
const Joi=require('@hapi/joi');
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

route.get('/',(req,res)=>{
return res.render('User',{error:req.flash('error'),success_msg:req.flash('registered')});
});
const schema = Joi.object().keys({
    firstName:Joi.string().regex(/^[a-zA-Z]/i).required(),
    lastName:Joi.string().regex(/^[a-zA-Z]/i),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required(),
    passwordConfirm:Joi.string().valid(Joi.ref('password')).required().strict().error(errors=>{
        return{
        message:'Password and Confirm Password Should Match'
        };
    })
});
route.post('/register',(req,res)=>{
const { firstName, lastName, email, password } =req.body;
const result = schema.validate(req.body);
if(result.error) 
{
req.flash('error',result.error.details[0].message);
res.redirect('/User');
}
User.findOne({email:req.body.email})
    .then(user =>{
        if(user){
            req.flash('error',"User Already Exists!");
            res.redirect('/User');
        }
        else{
            const name=`${firstName} ${lastName}`;
            const otp = require('./Email');
            res.render('Otp',{onetimepass:otp,name:name,email:email,pass:password});

        }
    });
});
route.post('/login',(req,res,next) => {
passport.authenticate('local',{
    successRedirect:'/User/dashboard',
    failureRedirect:'/User',
    failureFlash: true,
})(req,res,next);
});

route.get('/logout',(req,res) =>{
req.logout();
console.log("logged out");
res.redirect('/User');
});


route.get('/dashboard',ensureAuthenticated,(req,res) =>{
res.render("dashboard");
});
module.exports=route;