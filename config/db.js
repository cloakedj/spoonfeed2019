const mongoose = require("mongoose");
const uri ="mongodb+srv://kanwardhananjay:1999101275D@cluster0-qinrs.mongodb.net/SFDB?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log("Connection Succesful"))
    .catch(err => console.log(err));