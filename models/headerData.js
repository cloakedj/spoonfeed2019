const mongoose  = require('mongoose');
const pModel = require("./post");

let fetchPosts = async () =>{
return await pModel.find()
.sort({postTitle:-1,postSpoons:1})
.select({postTitle:1,postTags:{$slice:1},postSource:1,postLink:1,postImageSrc:1})
.limit(3);
};

let eQ = (async () =>{
try
{
return await fetchPosts();
}
catch(err)
{
console.log(err);
}
})();


module.exports = eQ;

 