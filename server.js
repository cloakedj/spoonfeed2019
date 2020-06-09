const express = require('express');
const app = express();
const db = require('./config/db');
const parser = require('./parser/parse');
const rssSources = require("./config/rss");
const morgan = require('morgan');
const oBA = require('./models/optionsBarActions');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const user = require('./routes/User');
const otp = require('./routes/insertUser');
const port = process.env.PORT || 3000;
const CRAWLINTERVAL = 1800000;

//Passport config
require('./config/passport')(passport);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Express Session
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

//Global vars for flash
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


app.set("views",__dirname+"/public/views");
app.set("view engine","pug");
app.use(morgan('tiny'));

app.use(express.static(__dirname+"/public/views/"));

app.use('/optionsBarActions',oBA);
app.use('/User',user);
app.use('/otp',otp)
app.get('/',async(req,res,next) =>{
const {mPD,scwID,scwiID,scwBD,dcnID} = await require('./models/dontMiss');
const rQ = await require('./models/headerData');
let uname;
if(req.user)
{
uname = req.user;
}
try
{
    console.log(`Fetch Gracefully`);
}
catch(err)
{
    console.log(err);
}
res.render("index",{
    headerPosts:rQ,
    mP:mPD,
    scwI:scwID,
    scwiI:scwiID,
    scwB:scwBD,
    dcnI:dcnID,
    user:uname
});
});
//Call Parser Once when server is started
// parser
// .then(elem => console.log(elem))
// .catch(err => console.log(err));

// setInterval(()=>
// parser
// .then(elem => console.log(elem))
// .catch(err => console.log(err)),CRAWLINTERVAL);

app.listen(port);

