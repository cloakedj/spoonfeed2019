module.exports={
    ensureAuthenticated: (req,res,next) =>{
        if(req.isAuthenticated()){
            return next();
        }
        console.log('Please log in');
        res.redirect('/User');
    }
}