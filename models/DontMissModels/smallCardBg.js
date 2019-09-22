const mongoose =require('mongoose');
const pModel = require('../post');

let scwB = async () =>{
return await pModel.find()
.sort({postDate:-1,postSpoons:-1})
.select({postTitle:1,postSource:1,postLink:1,postImageSrc:1}) 
.skip(3)
.limit(2);
}

module.exports = scwB;