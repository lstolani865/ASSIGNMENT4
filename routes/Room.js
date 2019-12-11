const express = require('express')
const router = express.Router();
const Room = require ("../models/Room");

const hasAccess = require("../middleware/auth");
const isAdmin = require("../middleware/typeCheck");
const path = require("path");


router.get("/profile/:id",(req,res)=>{

    Room.findById(req.params.id)
    .then((room)=>{
        res.render("Room/roomProfile",{
            roomDocument:room
        })
    })
    .catch(err=>console.log(`Error : ${err}`));
});
router.get("/edit/:id",(req,res)=>
{
    Room.findById(req.params.id)
    .then((room)=>{

        res.render("Room/roomEditForm",{
            roomDocument:room
        })

    })
    .catch(err=>console.log(`Error : ${err}`));
});

router.put("/edit/:id",(req,res)=>
{
    Room.findById(req.params.id)
    .then((room)=>{

        task.title=req.body.title;
        task.price=req.body.price;
        task.description=req.body.description;
        task.location=req.body.location;
        task.dateReminder=req.body.dateReminder;

        room.save()

        .then(()=>{
           res.redirect("/room/list") 
        })
        .catch(err=>console.log(`Error : ${err}`));

    })
    .catch(err=>console.log(`Error : ${err}`));
});
  
  
  
router.get("/add",hasAccess,isAdmin,(req,res)=>
{
    res.render("Room/roomAdd")
});

//Route to process user's request and data when the user submits the add image form
router.post("/add",(req,res)=>
{
    const errors=[];
     if(req.body.title =="")
     {
         errors.push("please enter a Title for Room")
     }

     if(req.body.price =="")
     {
         errors.push("please enter a Price for Room")
     }

     if(req.body.description =="")
     {
         errors.push("please enter  a Description for Room")
     }

     if(req.body.location =="")
     {
         errors.push("please enter a Location for Room")
     }

    //  if(req.files == null){
    //       errors.push("Sorry you must upload a photo of room")
    //      }
     
    //            //file is not an image
    //   if(req.files.roomImage.mimetype.indexOf("roomImage")==-1)
    //        {
    //            errors.push("Sorry you can only upload images : Example (jpg,gif, png) ")
    //        }
         
    //  if(errors.length > 0 )
    //  {
    //      res.render("Room/roomAdd",{
    //          message:errors
    //      })
    //  }
 
     if(errors.length > 0)
      {
          res.render("Room/roomAdd",{
              message:errors,
              title :newUser.title,
              price : newUser.price,
              description : newUser.description,
              location:req.body.location,
              dateReminder:req.body.reminderDate
         })
        }
         else 
         {
    const newRoom=
    {
        title:req.body.title,
        price:req.body.price,
        description : req.body.description,
        location:req.body.location,
       dateReminder:req.body.reminderDate
    }
     const errors=[];
     if(req.files == null){
         errors.push("Sorry you must upload a photo of room");
     }
   
              //file is not an image
    if(req.files.roomImage.mimetype.indexOf("roomImage")==-1)
         {
             errors.push("Sorry you can only upload images : Example (jpg,gif, png) ")
         }
         if(errors.length > 0)
      {
          res.render("Room/roomAdd",{
            message:errors})
        const room = new Room(newRoom)
        console.log(`hhh`);
        room.save()
        .then(room=>{
            console.log(`Room was added to the database`);
            console.log(`${room}`);
            //res.redirect("/room/list");
            
             //rename file to include the userid
              req.files.roomImage.name = `db_${room._id}${path.parse(req.files.roomImage.name).ext}`
            
              //upload file to server
              req.files.roomImage.mv(`public/images/uploads/${req.files.roomImage.name}`)
              .then(()=>{
 
                 //Then is needed to refer to associate the uploaded image to the user
                  Room.findByIdAndUpdate(room._id,{
                     roomImage:req.files.roomImage.name 
                  })
                  .then(()=>{
                      console.log(`File name was updated in the database`)
                      res.redirect("/admin/Dashboard");  
                  })
                  .catch(err=>console.log(`Error :${err}`));
                 
                  
              });
 
         })
         .catch(err=>console.log(`Error :${err}`));
 
     }
 
 }
});
 
        
      
////Route to fetch all tasks
router.get("/list",hasAccess,isAdmin,(req,res)=>
{

    Room.find()
    .then((room)=>{
        res.render("Room/roomView",
        {
            roomsList:room
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
});

//Rout to user room list 
router.get("/roomListing",(req,res)=>{
   Room.find()
   .then((room)=>{

    res.render("Room/roomListing",
    {
   roomsList:room
    
});
})
.catch(err =>console.log(`Error:${err}`))
});




module.exports=router;