const express = require('express');
const bp = require('body-parser');
const cookie = require('cookie-parser');
const bycrypt = require('bcryptjs')
const mongoose = require("mongoose")
const methodOveride = require("method-override");

const app = express();
mongoose.connect("mongodb+srv://mahdav:mahdav1234@cluster0.klk9z.mongodb.net/blog?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true, useFindAndModify : false});

app.set('view engine','ejs')
app.use(cookie());
app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOveride('_method'))
app.use("/login",require("./routes/login"))
app.use("/dashboard",require("./routes/dashboard"))
app.use("/register",require("./routes/register"))
app.use("/edit",require("./routes/edit"))
app.use("/posts",require("./routes/posts"))



app.get("/",(req,res)=>{
  res.redirect("/login")
})


app.listen(3000,()=>{
  console.log("Server UP on port 3000");
})
