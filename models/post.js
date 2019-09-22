const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
postTitle:String,
postSource:String,
postTags:[],
postLink:String,
postDescription:String,
postSpoons:{type:Number,default:0},
postForks:{type:Number,default:0},
postDate:Date,
crawlDate:{type:Date,default:Date.now()},
postImageSrc:String,
});

const postModel = mongoose.model("pModel",postSchema,"Posts");

module.exports = postModel;


