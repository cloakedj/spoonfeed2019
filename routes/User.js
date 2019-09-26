const express=require('express');
const route=express.Router();
const Joi=require('@hapi/joi');
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const nodemailer = require('nodemailer');
const otp = Math.floor(100000 + Math.random() * 900000);

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
            
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'SpoonFeed2019@gmail.com',
            pass: 'webtechlabrocks'
        }
    });
    
    const mailOptions = {
      from: 'SpoonFeed@gmail.com',
      to: email, 
      subject: 'Otp To Register With SpoonFeed', 
      html: `        
      <div class="container" style="height: 400px;
      width: 100%;
      font-family: 'Franklin Gothic Medium';
      box-shadow: 0px -1px 9px -1px black;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      padding: 2%;">
      <div class="heading" style="color: antiquewhite;
      background: black;
      border-radius: 4px;
      margin-left:40%;
      transform:translateX(-50%);
      width: 20%;
      font-size: 2rem;
      text-align: center;
      margin-bottom:5%;">OTP</div>
      <hr>
      <div class="headings" style="text-align: justify">
      <h2 style="text-align: center;color:purple">SpoonFeed</h2>  
      <h4 style="text-align: center;color:purple">Like It Spoon It, Hate It Fork It.</h4>  
      </div>
      <hr>
      <div class="otp" style="text-align: center;font-family: 'Franklin Gothic Medium'">
      <h1 style="letter-spacing: 12px;">${otp}</h1>
      </div>
      <br><br>
      <div class="note" style="text-align: justify;color:purple">
          <p><b>NOTE: </b> Use the above given 6 digit OTP to complete your registration width
          SpoonFeed. Do Not Share Your OTP with anyone. Have fun with SpoonFeed. See You Soon!</p>
      </div>
      </div>
      <div class="footer" style="font-family: 'Franklin Gothic Medium';color:#fff;background:black;width:100%;height:60px;
      box-shadow: 0px -1px 9px -1px black;
      text-align: center;
      border-bottom-left-radius: 7px;
      padding-top:3%;
      border-bottom-right-radius: 7px;">All Rights Reserved SpoonFeed</div>`
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        console.log(err)
    else
        console.log(info);
     });
            res.render('Otp',{onetimepass:otp,name:name,email:email,pass:password});

        }
    });
});
route.post('/login',(req,res,next) => {
passport.authenticate('local',{
    successRedirect:'/User/Authenticated',
    failureRedirect:'/User',
    failureFlash: true,
})(req,res,next);
});

route.get('/Authenticated',(req,res)=>{
res.redirect('/');
});

route.get('/logout',(req,res) =>{
req.logout();
console.log("logged out");
req.flash('registered',"Logged Out Successfully");
res.redirect('/User');
});


route.get('/dashboard',ensureAuthenticated,(req,res) =>{
res.render("dashboard");
});
module.exports=route;