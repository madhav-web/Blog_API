const express = require("express");
const Items = require("../models/items")
const router = express.Router();

router.get("/:id",async(req,res)=>{
  try{
    const post = await Items.findOne({_id : req.params.id})
    res.render("post",{post : post})
  }
  catch(e){
    res.send(e.message)
  }
})


module.exports = router
