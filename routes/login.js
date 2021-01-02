
const express = require('express');
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../models/users')
const verify = require("../middleware/verify")
const router = express.Router();
const key = "VerrryyyLLLLOooonnnngggKKKEeeeeeeeeeeeeetttttt";

router.get("/" ,verify,(req,res)=>{
  if(req.auth == "valid"){
    res.redirect("/dashboard")
    return;
  }
  res.render("login" , {errors:[]});
})

router.post("/",async(req,res)=>{
  try{
  let error = [];
  const {username,password} = req.body;
  const user = await User.findOne({username : username});
  if(!user){
    error.push("Invalid Credentials")
    res.render("login" , {errors : error})
    return
  }
  const compared = await bycrypt.compare(password,user.password)
  if(!compared){
    error.push("Invalid Credentials")
    res.render("login" , {errors : error})
    return
  }
  const payload = {
    username : username
  }
  const token = await jwt.sign(payload,key,{algorithm : 'HS256'})
  res.cookie("token",token,{httpOnly : true});
  res.redirect("/login")
}
catch(e){
  res.send(e.message)
}
})

module.exports = router;
