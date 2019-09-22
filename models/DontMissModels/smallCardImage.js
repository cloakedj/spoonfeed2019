const mongoose =require('mongoose');
const pModel = require('../post');


let scwI = async () =>{
return await pModel.find()
.sort({postDescription:-1,postSpoons:-1})
.select({postTitle:1,postSource:1,postLink:1,postImageSrc:1}) 
.skip(3)
.limit(3);
}

module.exports = scwI;