const mongoose = require("mongoose");
const uri = //MongoDB Uri;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log("Connection Succesful"))
    .catch(err => console.log(err));
