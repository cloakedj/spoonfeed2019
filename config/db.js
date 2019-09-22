const mongoose = require("mongoose");
const uri ="mongodb://localhost:27017/SFDB";
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log("Connection Succesful"))
    .catch(err => console.log(err));