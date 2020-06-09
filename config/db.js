const mongoose = require("mongoose");
const uri =//MongoDB uri;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log("Connection Succesful"))
    .catch(err => console.log(err));
