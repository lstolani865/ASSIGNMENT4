const isAdmin = (req,res,next)=>
{  console.log(req.session.userInfo.type);
    if(req.session.userInfo.type=="Admin")
    {
      
        next();
    }
    else
    {
        res.redirect("/user/userDashboard");
    }
}

module.exports=isAdmin;