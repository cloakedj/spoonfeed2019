const mongoose =require('mongoose');
const pModel = require('../post');

let scwiI = async () =>{
return await pModel.find()
.sort({postSource:-1,postSpoons:-1})
.select({postTitle:1,postSource:1,postLink:1,postImageSrc:1,postSpoons:1,postForks:1}) 
.skip(7)
.limit(2);
}

module.exports = scwiI;