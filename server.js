const express = require('express');
const app = express();
const db = require('./config/db');
// const parser = require('./parser/parse');
// const rssSources = require("./config/rss");
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const CRAWLINTERVAL = 1800000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("views",__dirname+"/public/views");
app.set("view engine","pug");
app.use(morgan('tiny'));

app.use(express.static(__dirname+"/public/views/"));


app.get('/',async(req,res,next) =>{
const {mPD,scwID,scwiID,scwBD,dcnID,trendTags,moreTrendTags} = await require('./models/dontMiss');
const rQ = await require('./models/headerData');
try
{
    console.log(`Fetch Gracefully: ${moreTrendTags}`);
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
    tags:trendTags,
    moreTrends:moreTrendTags
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

