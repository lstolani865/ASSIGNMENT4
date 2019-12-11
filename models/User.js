const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

  const registrationSchema = new Schema({
    email:  
    {
        type:String,
        required:true,
        unique:true
    },
    firstName:
    {
        type: String,
        required:true
    },

    lastName:
    {
        type: String,
        required:true
    },

    password:
    {
        type: String,
        required:true
    },

    month:
    {
        type: String,
        required:true
    },

    day:{ 
        type:String,
        required:true
    },

    year:{
        type: String,
        required:true
    },

    type :
  {
      type:String,
      default:"User"
  },

    dateCreated :
    {
      type:Date,
      default: Date.now()
    }
  });

  //The "pre" mongoose function is going to call the below function right before the document is saved to the DB
  registrationSchema.pre("save",function(next){
  
    bcrypt.genSalt(10)
    .then(salt=>{
        bcrypt.hash(this.password,salt)
        .then(hash=>{
            this.password=hash
            // The below code is a call back function that does the following :
             //It forces the code of execution to  move onto the next code in the execution queue 
            next();
        })
    })

})


  const regForms = mongoose.model('regForms', registrationSchema);


module.exports=regForms;
