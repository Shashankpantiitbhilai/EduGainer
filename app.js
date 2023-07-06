//jshint esversion:6
require("dotenv").config();//put at top
const express=require("express");
const  ejs=require("ejs");
const  bodyParser=require("body-parser");
const app=express();
const mongoose=require("mongoose");
const session = require('express-session')
const passport= require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const md5=require("md5");
//using becrypt as it is more safer and used in industry
// const bcrypt=require("bcrypt");
// const saltRounds=10;for using passwort .js
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: 'Our little secrets',
  resave: false,
  saveUninitialized: false,
 
}))//place before mongoose.connect
app.use(passport.initialize());//initialize passport
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the MongoDB server')});
//creating a schema for our collection
 
const userSchema=new mongoose.Schema({
  email:String,
  password:String,
  googleId:String
})

userSchema.plugin(passportLocalMongoose);//hash and salt our password and save users in mongoDB database
userSchema.plugin(findOrCreate);

const User=mongoose.model("user",userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});//creates and store data inside cookies


passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});//destroys cookies and authenticate users


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"//due to googleplus deprecation
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));//after completion of google authentication this callback fxn get triggered and we will log their profile 
//and try to create them as a user on our database if they does not exist


app.get("/",function(req,res)
{
    res.render("home");
})
app.get("/auth/google",

   passport.authenticate("google", { scope: ["profile"] }//use passport to authenticate user using google strategy and this line enable to get a pop up saying sign in with google 
))//initiates authentication on google servers asking them for user profile once the login process is successfull

app.get("/auth/google/secrets"//authorized redirective uri from google cloud 
  ,passport.authenticate('google', { failureRedirect: '/login' }),//redirect to login page if authentication fails
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("/secrets");
  });//after login success if auth/google route google makes a get request to this route
  //here er authenicate user locally and save their logged in session and once  they are authentictaed successfull tthen we redirect them to
  //secrets route
  //At this stage google authenticateion step is completed and the callnback fxn gets  at line 57

app.get("/login",function(req,res)
{
    res.render("login");
})
app.get("/register",function(req,res)
{
  res.render("register");
})
app.get("/secrets",function(req,res)
{if(req.isAuthenticated())
  {
    res.render("secrets")
  }
  else{
    res.redirect("/login")
  }});

  app.get("/logout",function(req,res)
{req.logout(function(err)//it log ut user from our website only and not from google or any third party website,for that we will nedd a soecial button that lead  them to that logout route 
//but it will logout from entire third party services like google maps gmail etc
  {
    if (err) {console.log(err); }
    res.redirect('/');
  });
  
});
app.get("/submit",function(req,res)
{if(req.isAuthenticated())
  {
    res.render("/submit")
  }
  else{
    res.redirect("/login")
  }}

)

app.post("/register",function(req,res){
  User.register({username:req.body.username,active:false}, req.body.password, function(err, user) {//.register is method of passport local mongoose
    if (err) { 
      console.log(err);
      res.redirect("/register");
     }
    

   passport.authenticate("local")(req,res,function() {//use of authenticate here is to check whether  the username already exits or not
    
        res.redirect("/secrets");
   
  
  
      // Value 'result' is set to false. The user could not be authenticated since the user is not active
    });
  });
});
// {bcrypt.hash(req.body.password, saltRounds, function(err, hash) {//using decrypt it creates hash with password and adds salt rounds
  
//   // Store hash in your password DB.
//   const newUser=new User({
//     email:req.body.username,
//     password:hash
//    });


  
//    newUser.save()
//   .then((result) => {
       
          
//         res.render("secrets");
//       }
//       )})})


 app.post("/login",function(req,res){
  const user=new User({
    username:req.body.username,
    password:req.body.password
  })
  req.login(user,function(err)
  {if(err){
    console.log(err);
  }
  else{
    passport.authenticate("local")(req,res,function() {
    
      res.redirect("/secrets");
 
    })

  }

  })
 })
//       { const username=req.body.username
//         const password=req.body.password
//           User.findOne({email:username})
//           .then((foundUser) => {
//             bcrypt.compare(password, foundUser.password, function(err, result) {
//               // result == true
//               if(result===true)
//               {
//                 res.render("secrets");
//               }
//           });
       
          
    //  }
    //       )
    //   })
   
   
   



app.listen(3000,function()
{
    console.log("server is running on port 3000");
})