const express = require('express')
const router = express.Router();
const Room =require("../models/Room");

/*GENERAL ROUTES*/
//Route to direct user to home page
router.get("/",(req,res)=>
{
    res.render("General/home");
});


//Route to direct user to about us page
router.get("/about",(req,res)=>
{
    res.render("General/about");
});

router.post("/search",(req,res)=>{
    if(req.body.where !=""){
       Room.find({location:req.body.where})
       .then((rooms)=>{
        res.render("General/search",{
            lists: rooms
        })

       })
       .catch(err =>console.log(`Error:${err}`))
    }
})

module.exports=router;