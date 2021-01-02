const express = require('express');
const Items = require("../models/items")
const verify = require("../middleware/verify")

const router = express.Router();

router.get("/:id",verify,async(req,res)=>{
  if(!(req.auth=="valid")){
    res.redirect("/login")
    return
  }
  try{
    const item = await Items.findOne({_id : req.params.id});
    res.render("edit",{item : item});
  }
  catch(e){
    res.send(e.message)
  }

})

router.post("/:id",verify,async(req,res)=>{
  try{
  await Items.findOneAndUpdate({_id: req.params.id},{
    title : req.body.title,
    description : req.body.description,
    username : req.dataa.username,
    tags : req.body.tags
  },function(err){
    if(err){
      res.send(err)
      return;
    }
  })
  res.redirect("/dashboard")
}
catch(e){
  res.send(e.message)
}
})

module.exports = router;
