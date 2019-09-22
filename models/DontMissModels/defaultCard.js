const mongoose =require('mongoose');
const pModel = require('../post');

let dcnI = async () =>{
return await pModel.find()
.sort({postDescription:-1,postSpoons:-1})
.select({postTitle:1,postLink:1}) 
.skip(10)
.limit(3);
}

module.exports = dcnI;