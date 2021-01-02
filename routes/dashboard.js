const express = require('express');
const verify = require('../middleware/verify');
const cloudinary = require("../handlers/cloudinary");
const upload = require("../handlers/multer")

const Item = require("../models/items");

const router = express.Router();

router.get("/",verify,async (req,res)=>{
  if(!(req.auth=="valid")){
    res.redirect("/login")
    return
  }
  try{
    const items  = await Item.find({username : req.dataa.username}).sort({id:-1}).limit(5);
    res.render("dashboard", {items : items })
  }
  catch(e){
    res.send(e.message);
  }
})


router.get("/allpost",verify,async(req,res)=>{
  try{

  const items = await Item.find({username : req.dataa.username}).sort({id:-1});
  res.render("allPosts",{items  : items})
}
catch(e){
  res.send(e.message)
}
})

router.get("/logout",async(req,res)=>{
  res.clearCookie("token");
  res.redirect("/login")
})




router.get("/add",verify,(req,res)=>{
  if(!(req.auth=="valid")){
    res.redirect("/login")
    return
  }
  res.render("add")
})

router.post("/add",verify,upload.single("image"),async (req,res)=>{
  if(!(req.auth=="valid")){
    res.redirect("/login")
    return
  }

  try{
  const result = await cloudinary.v2.uploader.upload(req.file.path,{quality : "auto" , fetch_format : "auto", crop : "scale"});
  const item = new Item ({
    title : req.body.title,
    description : req.body.description,
    cloudinary_id : result.public_id,
    url : result.secure_url,
    username : req.dataa.username,
    tags : req.body.tags

  })
  await item.save();
  res.redirect("/dashboard");
}
catch(e){
  res.send(e.message)
}

})


router.delete("/:id",verify,async(req,res)=>{
  if(!(req.auth=="valid")){
    res.redirect("/login")
    return
  }
  try{
  const item = await Item.findOne({_id : req.params.id });
  await cloudinary.uploader.destroy(item.cloudinary_id);
  await Item.findOneAndDelete({_id : req.params.id});
  res.redirect("/dashboard");
  }
  catch(e){
    res.send(e.message);
  }

})

module.exports = router;
