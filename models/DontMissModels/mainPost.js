const mongoose =require('mongoose');
const pModel = require('../post');


let mP = async () =>{
return await pModel.find()
.sort({postTitle:1,postSpoons:-1})
.select({postTitle:1,postSource:1,postDescription:1,postLink:1,postImageSrc:1}) 
.skip(5)
.limit(2);
}

module.exports  = mP;