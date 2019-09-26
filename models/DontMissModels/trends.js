const mongoose =require('mongoose');
const pModel = require('../post');

let collectTags = (async () =>{
const tags = await pModel.find()
.sort({crawlDate:-1,postSpoons:-1})
.select({_id:1,postTags:{$slice:1}}) 
.limit(4);
const moreTags = await pModel.find()
.sort({crawlDate:-1,postSpoons:-1})
.select({_id:1,postTags:{$slice:1}}) 
.skip(5)
.limit(7); 
return {tags,moreTags};
})();

module.exports = collectTags;