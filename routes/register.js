const express = require("express");
const router = express.Router();
const Users = require("../models/users")
const bcrypt = require("bcryptjs")

router.get("/",(req,res)=>{
  res.render("register" ,{errors : []})
})

router.post("/",async(req,res)=>{
  try{
  let error =[]; //initnializing an error array
  const user = await Users.findOne({username : req.body.username}); //Searching if the userid is already taken
  if(user){ //if yes, then add user error message
    error.push("Username Already Taken");
  }
  if(error.length == 0){ //If there are no errors, then hash the password and store it in database;
    let pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    pass = await bcrypt.hash(pass,salt);
    const use = new Users({
      username : req.body.username,
      password : pass
    })

    await use.save(); // saving to database
    res.redirect("/")
  }
  //if errors are there then, render those errors
  else{
    res.render("register",{errors : error})
  }
}
catch(e){
  res.send(e.message);
}

})


module.exports = router
