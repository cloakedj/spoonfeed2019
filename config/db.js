const mongoose = require("mongoose");
const uri =//Mongo Uri;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log("Connection Succesful"))
    .catch(err => console.log(err));
