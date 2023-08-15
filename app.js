//jshint esversion:6
require("dotenv").config();//put at top
const express=require("express");
const  ejs=require("ejs");
const _=require("lodash");
const  bodyParser=require("body-parser");
const app=express();
const mongoose=require("mongoose");
const session = require('express-session')
const passport= require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')
// var imgSchema = require('./model.js');
var fs = require('fs');
const nodemailer = require("nodemailer");
var path = require('path');
const Jimp = require("jimp");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const multer = require('multer');

const req=require("request");
const https = require("https");
const sharp = require('sharp');
const { google } = require('googleapis');


const FacebookStrategy = require('passport-facebook');


const cron = require('node-cron');

const uploadToGoogleDrive = require('./googledrive');


// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain

// Assuming you have a buffer named 'bufferData'






 
//Image is a model which has a schema imageSchema
 





const folderId = '1v2ql2NF7U22LfLsWAJXopRv3BWcyg7HL';




const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const maxSize = 0.5 * 1024 * 1024; // 10 MB (in bytes)

const upload = multer({
  storage,
  limits: {
    fileSize: maxSize,
  },
});

// View Engine Setup

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

  app.use(express.json({limit: "20mb", extended: true}))
app.use(express.urlencoded({limit: "20mb", extended: true, parameterLimit: 50000}))

const SerpApi = require("google-search-results-nodejs");
const { builtinModules } = require("module");
const search = new SerpApi.GoogleSearch(process.env.API_KEY);




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
//for checking fee payment status

mongoose.connect("mongodb+srv://shashankpant94115:GRH5bml8Foua6trK@cluster1.ctxv50a.mongodb.net/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the MongoDB server')
    
    // Schedule the task to run once a day (adjust the interval as needed)
setInterval(deleteInactiveUsersFromRegistration, 24 * 60 * 60 * 1000);}) // Run every 24 hours);
//creating a schema for our collection
 
const userSchema=new mongoose.Schema({
  email:String,
  password:String,
  
  googleId:String,
  
})
const studRegisDetailSchema=new mongoose.Schema({
  Name:String,
  Gender:String,
 Email:String,
  DOB:String,
  FatherName:String,
  MotherName:String,
  Date:String,
  ContactNo1:Number,
  ContactNo2:Number,
  Address:String,
  AadharNo:Number,
  AdharCardPhoto:String,
  PrepareForExam:String,
  Shift:String,
  Photo: String,
 
      
  
  PaymentMethod:String,
  UploadPaymentScreenshot:  String,
    
Seat:String,
Amount:Number,
Reg:Number,
Status:String
})

//reading from google sheets
const d = new Date();
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let Mon = month[d.getMonth()];
//jan
const JanSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
 
  Date:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto: String

 
  
})
//feb
const FebSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto: String

 
  
})
const MarchSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto: String

 
  
})
const AprilSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto: String


})

const MaySchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto: String
 
  
})
  

const JuneSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto:String

 
  
})
const JulySchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
  Email: String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,

 
  
})
const AugustSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,

 
  
})
const SeptSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,

 
  
})
const OctSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,

 
  
})
const NovSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,

 
  
})
const DecSchema=new mongoose.Schema({
  Reg:Number,
  Name:String,
 Email:String,
  Shift:String,
  Seat:String,
  Date:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,

 
  
})

const classStudFee=new mongoose.Schema({
  Reg:String,
  Name:String,
Email:String,
  Month:String,
  Date:String,
  Batch:String,
  Subject:String,
  Faculty:String,
  PaymentMethod:String,
  Amount:Number,
PaymentPhoto:String,


  
})
const classRegisStud = new mongoose.Schema({
  Reg: String,
  Name: String,
  Gender: String,
  Class: String,
  Subject: String,
  Board: String,
  Faculty: String,
  School: String,
  Email: String,
  Date:String,
  DOB: String,
  FatherName: String,
  MotherName: String,
  ContactNo1: Number,
  ContactNo2: Number,
  Address: String,
  AadharNo: Number,
  AdharCardPhoto: String, // Store the Google Drive link
  
  PrepareForExam: String,
  Photo:String, // Store the Google Drive link
  
});


 
  


const faq=new mongoose.Schema({
  Question:String,
  Answer:String})


userSchema.plugin(passportLocalMongoose);//hash and salt our password and save users in mongoDB database
userSchema.plugin(findOrCreate);

const User=mongoose.model("user",userSchema);
const LibstudData=mongoose.model("LibregisData", studRegisDetailSchema);

const Jan=mongoose.model("jan",JanSchema);

const Feb=mongoose.model("feb",FebSchema);

const March=mongoose.model("march",MarchSchema);

const April=mongoose.model("april",AprilSchema);

const May=mongoose.model("may",MaySchema);

const June=mongoose.model("june",JuneSchema);

const July=mongoose.model("july",JulySchema);

const Aug=mongoose.model("aug",AugustSchema);

const Sept=mongoose.model("sept",SeptSchema);

const Oct=mongoose.model("oct",OctSchema);

const Nov=mongoose.model("nov",NovSchema);

const Dec=mongoose.model("dec",DecSchema);

const Students=mongoose.model("StudFeeClass",classStudFee);
const Faqs=mongoose.model("FreqAskQuestions",faq);

const ClassRegStudent=mongoose.model("ClassRegStudent", classRegisStud);
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"


const monthArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];

const date = new Date();
const monthName = monthArray[date.getMonth()];
// Extract day, month, and year from the date object
const day = date.getDate();
// Adding 1 because months are zero-based
const year = date.getFullYear();

const formattedDate = `${day}/${monthName}/${year}`;

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
  callbackURL: "http://localhost:3000/auth/google/intro",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"//due to googleplus deprecation
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ username: profile.displayName,googleId: profile.id}, function (err, user) {
    return cb(err, user);
  });
}
));//after completion of google authentication this callback fxn get triggered and we will log their profile 
//and try to create them as a user on our database if they does not exist
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/intro"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({username: profile.displayName, facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

// Middleware to prevent cached pages after logout
app.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
  }
  next();
});



app.post("/success",function(req,res)
{
    const email=req.body.email;
  
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            
          
        }]
    }
    const jsonData= JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/6d468162d6"; 
 
   const options={
    method:"POST",
    auth:"Spant:3269a05e739c44ce6eb2d6adf3265408-us21",
   }
 const request=  https.request(url,options,function(response)
   {
    response.on("data",function(data)
    {  console.log(JSON.parse(data));
      var statusCode=response.statusCode;
      if(statusCode===200)
      {
          res.redirect("/success");
      }
    

    });
   
   })
   request.write(jsonData);
   request.end();}
)
app.get("/success",function(req,res)
{if(req.isAuthenticated())
  {
  res.render("success");}
  else{
    res.render("error",{authenticate:"You are not Authenticated to access this page"})
  
  }
})
app.get("/",function(req,res)
{cron.schedule('28 15 * * *', () => {
  var transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: "edugainersclasses@gmail.com",
      pass: 'uwknsogaphlblqkk'
    }
  });//1-6 fee day
  
  var mailOptions = {
    from: 'edugainersclasses@gmail.com',
    to: "shashankpant69@gmail.com",
    subject: 'Regarding Fee Payment',
    html: '<html>' +
    '<body>' +
    '<h1 style="color: #336699;">Thank you, we have received your response!</h1>' +
    '<p style="color: #333;">With Regards,</p>' +
    '<p style="color: #333;">Edugainer\'s Library, Uttarkashi</p>' +
    '<p style="color: #333;">Contact No: 9997999768</p>' +
    '</body>' +
    '</html>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })},
 {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
    res.render("home");
})
app.get("/auth/google",

   passport.authenticate("google", { scope: ["profile"] }//use passport to authenticate user using google strategy and this line enable to get a pop up saying sign in with google 
))//initiates authentication on google servers asking them for user profile once the login process is successfull

app.get("/auth/google/intro"//authorized redirective uri from google cloud 
  ,passport.authenticate('google', { failureRedirect: '/login' }),//redirect to login page if authentication fails
  function(req, res) {
    // Successful authentication, redirect intro.
    res.redirect("/intro");
  });//after login success if auth/google route google makes a get request to this route
  //here er authenicate user locally and save their logged in session and once  they are authentictaed successfull tthen we redirect them to
  //intro route
  //At this stage google authenticateion step is completed and the callnback fxn gets  at line 57
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/intro',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/intro');
    });

app.get("/login",function(req,res)
{const error=""
    res.render("login",{errorMessage:error});
})
app.get("/register",function(req,res)
{const error="";
  res.render("register",{errorMessage:error});
})
// app.get("/faq",function(req,res)
// {
//   res.render("faq",{QuestionsArray:Questions});
// })
app.get("/classes-enrolled",function(req,res)
{const reg="";
const error="";
if(req.isAuthenticated())
{
res.render("classes-enrolled",{errorMessage:error,regis:reg});
}
else{
  res.render("error",{authenticate:"You are not Authenticated to access this page"})

}
})
app.get("/error",function(req,res)
{
  res.render("error");
})
app.get("/intro",function(req,res){
// {const dataId = "0x3908ed08d3bdd33f:0xc82a9e75e23749e4";

// const params = {
//   engine: "google_maps_reviews",
//   hl: "en",
//   data_id: dataId,
// };

// const getJson = () => {
//   return new Promise((resolve) => {
//     search.json(params, resolve);
//   });
// };

// const getResults = async () => {
//   const allReviews = {
//     reviews: [],
//   };
//   while (true) {
//     const json = await getJson();
//     if (!allReviews.placeInfo) allReviews.placeInfo = json.place_info;
//     if (json.reviews) {
//       allReviews.reviews.push(...json.reviews);
//     } else break;
//     if (json.serpapi_pagination?.next_page_token) {
//       params.next_page_token = json.serpapi_pagination?.next_page_token;
//     } else break;
//   }
//   return allReviews;
// };

// //found document collection
// getResults().then((result) => 
if(req.isAuthenticated())
{
res.render("intro");
}
else{
  res.render("error",{authenticate:"You are not Authenticated to access this page"})

}
    
})
     




  app.get("/library", function(req, res) {
    if(req.isAuthenticated())
{

    // Use the Mongoose aggregate method to group and count documents by the "Shift" field
    LibstudData.aggregate([
      {
        $match: {
          Status: "Active" // Filter documents with status "active"
        }
      },
      {
        $group: {
          _id: "$Shift",
          count: { $sum: 1 }
        }
      }
    ])
    .then((result) => {
      // result is an array containing objects like { _id: "Shift value", count: number_of_documents }
      // We'll convert the array to an object for easy access
      const seatsAvailable = {};
      ["9 PM to 6 AM", "2 PM to 11 PM", "7 AM to 7 PM", "24*7", "2 PM to 9 PM", "7 PM to 11 PM", "7 AM to 2 PM"].forEach((shift) => {
        seatsAvailable[shift] = 0;
      });
      result.forEach((item) => {
        if (item.count != 0) {
          seatsAvailable[item._id] = item.count;
        } else {
          seatsAvailable[item._id] = 0;
        }
      });
  
      // Pass the seatsAvailable object to your template for rendering on the website
      res.render("library", { seats: seatsAvailable });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    })}
   
else{
  res.render("error",{authenticate:"You are not Authenticated to access this page"})

}
  });
  
app.get("/Shift",function(req,res)
{
//found document collection
    res.render("Shift");
})

app.get("/already-regis",function(req,res)
{    if(req.isAuthenticated())
  {
  
      
    res.render("already-regis",{errorMessage:""});}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    
    }

})
app.get("/new-regis",function(req,res)
{ 

//found document collection
if(req.isAuthenticated())
{

    
  res.render("new-regis",{currentDate:formattedDate});}
  else{
    res.render("error",{authenticate:"You are not Authenticated to access this page"})
  }
    
})
app.get("/payment",function(req,res)
{
//found document collection
if(req.isAuthenticated())
{

    res.render("payment",{mon:monthName,name:""});}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    }
})
app.get("/thanku",function(req,res)
{
//found document collection
if(req.isAuthenticated())
{


    res.render("thanku");
}
else{
  res.render("error",{authenticate:"You are not Authenticated to access this page"})
    

}})
app.get("/classes",function(req,res)
{
//found document collection
if(req.isAuthenticated())
{

    res.render("classes");}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    }    
})
app.get("/Batches",function(req,res)
{if(req.isAuthenticated())
  {
  
//found document collection
    res.render("Batches");}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    }  
})
app.get("/class-reg",function(req,res)
{if(req.isAuthenticated())
//found document collectionif(req.isAuthenticated())
  {
  
    res.render("class-reg",{currentDate:formattedDate})}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    }
})
app.get("/organization",function(req,res)
{if(req.isAuthenticated()){
  res.render("organization")}
  else{
    res.render("error",{authenticate:"You are not Authenticated to access this page"})
  }
  }
)
app.get("/class-fee",function(req,res)
{if(req.isAuthenticated()){
 
  
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
const mon = month[d.getMonth()];
//found document collection
const reg="";
    res.render("class-fee",{monthName:mon,regis:reg,currentDate:formattedDate});}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    }

})
app.get("/about",function(req,res)
{if(req.isAuthenticated()){
  res.render("about");}
  else{
    res.render("error",{authenticate:"You are not Authenticated to access this page"})
  }
})

app.get("/appreciate",function(req,res)
{if(req.isAuthenticated()){
//found document collection
    res.render("appreciate");}
    else{
      res.render("error",{authenticate:"You are not Authenticated to access this page"})
    }
})
app.get("/contact",function(req,res)
{
//found document collection
if(req.isAuthenticated()){
res.render("contact");}
else{
  res.render("error",{authenticate:"You are not Authenticated to access this page"})
}
}
)

app.get("/checkAuthStatus", function (req, res) {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

app.get("/class-regis",function(req,res)
{if(req.isAuthenticated()){
  res.render("class-regis",{currentDate:formattedDate});}
  else{
    res.render("error",{authenticate:"You are not Authenticated to access this page"})
  }
})


app.post("/already-regis", function(req, res) {
  const regNO = req.body.reg;

  LibstudData.findOne({ Reg: regNO })
    .then((result) => {
      console.log(result.Reg);
      console.log(regNO);
      if (result.Reg == regNO) {

        res.render("payment",{currentDate:formattedDate,regis:result.Reg,name:result.Name,shift:result.Shift,email:result.Email},);
        
      } else {
        const error="You are not registered"
        res.render("already-regis",{errorMessage:"You Are not Registered Yet!!"}); // Render a "not-found" view if the document is not found
      }
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
      res.render("already-regis",{errorMessage:"You Are not Registered Yet!!"}); // Redirect to an error page or display an error message
    });
});


  app.get("/logout",function(req,res)
{
  
  
  req.logOut(function(err)//it log ut user from our website only and not from google or any third party website,for that we will nedd a soecial button that lead  them to that logout route 
//but it will logout from entire third party services like google maps gmail etc
  {
    if (err) {console.log(err); }
    res.redirect('/');
  })});
  
// });

// app.get("/submit",function(req,res)
// {
//   if(req.isAuthenticated()){
//     res.render("submit");
//   }
//   else{
//     res.render("/login");

//   }
// }
 

// app.post("/submit",function(req,res){
//   const submittedSecret=req.body.secret;
// console.log(req.user.id);
// User.findById(req.user.id)//search for document
//   .then((result) => {//found document 
    
//   result.secret=submittedSecret;
    
//     result.save()//if save then->
   
//    res.redirect("/secrets");})
//   })




app.post("/register", function(req, res) {
  User.findOne({ username: req.body.username })
  .then((foundUser) => {
      if (foundUser) {
    
       res.render("register", { errorMessage: "User already exists." });
      } else {
        User.register(
          {
            username: req.body.username,
            active: false,
           
          },
          req.body.password,
          function(err, user) {
            if (err) {
              console.log(err);
              res.redirect("/register");
            } else {
              passport.authenticate("local")(req, res, function() {
                res.redirect("/intro");
              });
            }
          }
        );
      }
    })
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


app.post("/login", function(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
   
  });

  passport.authenticate("local", function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      // Authentication failed, display error message
      res.render("login", { errorMessage: "Invalid username or password." });
    } else {
      req.login(user, function(err) {
        if (err) {
          console.log(err);
          return next(err);
        }

        res.redirect("/intro");
      });
    }
  })(req, res, next);
});



app.post("/new-regis", upload.fields([
  { name: 'adharCardPhoto' },
  { name: 'photo'},
  { name: 'uploadPaymentScreenshot' }
]) ,async function (req, res, next) {
  try{
   console.log(req.files)
;    // Upload the images to Google Drive
    const adharCardPhotoFile = req.files.adharCardPhoto[0];
    const photoFile = req.files.photo[0];
    const paymentPhotoFile = req.files.uploadPaymentScreenshot[0];

    // Upload adharCardPhoto to Google Drive
    const adharCardPhotoLink = await uploadToGoogleDrive(adharCardPhotoFile, folderId, credentials);

    // Upload photo to Google Drive
    const photoLink = await uploadToGoogleDrive(photoFile, folderId, credentials);

    // Upload payment screenshot to Google Drive
    const paymentPhotoLink =await  uploadToGoogleDrive(paymentPhotoFile, folderId, credentials);
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
  const   name=req.body.name
  const  Shift=req.body.shift
  const  address=req.body.address
  const  contact=req.body.contactNo1

  const newStudent = new LibstudData({
    Reg:req.body.reg,
    
    Name: req.body.name,
    Seat:req.body.seat,
    Email: req.body.email,
    Gender: req.body.gender,
    DOB: req.body.dob,
    Date:req.body.date,
    FatherName: req.body.fatherName,
    MotherName: req.body.motherName,
    ContactNo1: req.body.contactNo1,
    ContactNo2: req.body.contactNo2,
    Address: req.body.address,
    AadharNo: req.body.aadharNo,
    AdharCardPhoto: adharCardPhotoLink.webContentLink,
    PrepareForExam: req.body.prepareForExam,
    Shift: req.body.shift,
    Amount: req.body.amount,
    
    Photo:  photoLink.webContentLink,
    
     
   
    PaymentMethod: req.body.paymentMethod,
    UploadPaymentScreenshot: paymentPhotoLink.webContentLink,
    Status:"Active"
  });
  // const data = fs.readFileSync(req.files.photo[0].path)

  // res.render('thanku', {
  //   image: data.toString('base64')
  // })

  
await newStudent.save()
const d = new Date();
const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const currentMonth = month[d.getMonth()];
  let StudFeeClass;
  switch (currentMonth) {
    case 'Jan':
      StudFeeClass = Jan;
      break;
    case 'Feb':
      StudFeeClass = Feb;
      break;
      case 'March':
        StudFeeClass = March;
        break;
        case 'April':
          StudFeeClass = April;
          break;
          case 'May':
            StudFeeClass = May;
            break;
            case 'June':
              StudFeeClass = June;
              break;
              case 'July':
                StudFeeClass = July;
                break;
                
                case 'Aug':
                  StudFeeClass = Aug;
                  break;
                  case 'Sept':
                    StudFeeClass = Sept;
                    break;
                    case 'Oct':
                    StudFeeClass = Oct;
                    break;
                    case 'Nov':
                    StudFeeClass = Nov;
                    break;
                    case 'Dec':
                    StudFeeClass = Dec;
                    break;
    // Add cases for other months as needed
    default:
      // Handle the case where the current month doesn't have a corresponding class
      res.redirect("/error");
      return;
  }



  // Upload adharCardPhoto to Google Drive


  uploadToGoogleDrive(paymentPhotoFile, folderId, credentials)
    .then(paymentPhotoLink => {
  const studFee = new StudFeeClass( { Reg: req.body.reg,
    Name: req.body.name,
    Email:req.body.email,
    
    Shift: req.body.shift,
    Seat: req.body.seat,
    Date:req.body.date,
    PaymentMethod: req.body.paymentMethod,
    Amount:req.body.amount,
    PaymentPhoto: paymentPhotoLink.webContentLink

     
  })

  studFee.save()
 } )
     

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "edugainersclasses@gmail.com",
          pass: 'uwknsogaphlblqkk'
        }
      });
      
      var mailOptions = {
        from: 'edugainersclasses@gmail.com',
        to: req.body.email,
        subject: "Regarding registration for the EduGainer's Library ",
        html: '<html>' +
        '<body>' +
        '<h1 style="color: Green;">Thank you for registering with us.</h1>' +
         ' <p style="color:Blue;">&#128591;</p>'+   ' <p style="color:Blue;">We will contact You soon to provide a unique <mark>Reg No</mark> and <mark>Seat No</mark>!!!</p>'+'<br>'+
        '<p style="color: Blue;">With Regards,</p>' +
        '<p style="color: Green;">EduGainer\'s  Classes & Library, </p>'+'<p style="color: Blue;">Court Road,Uttarkashi</p>' +
        '<p style="color: Blue;">Contact No: 9997999765</p>'+ '<p style="color: Blue;">Contact No: 8445192692</p>'+
        '<p style="color: Blue;">Contact No: 9997999768</p>' +
        '</body>' +
        '</html>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      ;
      buffer=req.files.photo[0].buffer;
      sharp(buffer).toBuffer((err, data, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Image converted successfully.');
      
          const imageData = data.toString('base64');
          const imageSrc = `data:image/jpeg;base64,${imageData}`;
      
          // Pass the image source along with other information to another page
          const profilePhotoWithImageSrc = { ...info, src: imageSrc };
          res.render("thanku", { profilePhoto: profilePhotoWithImageSrc,
            Name:name,Batch:Shift,Address:address,Contact:contact });
        }})}
    
        catch (error) {
          // Handle error
          console.error('Error registering student:', error);
          res.status(500).json({ error: 'Failed to register student' });
        }
        const paymentPhotoFile = req.files.uploadPaymentScreenshot[0];
      
      
        });
      
  


app.post("/payment", upload.single("paymentPhoto") , function (req, res, next) {
  // Upload the images to Google Drive
 
  const d = new Date();
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const currentMonth = month[d.getMonth()];
  const paymentPhotoFile = req.file;
  let StudFeeClass;
  switch (currentMonth) {
    case 'Jan':
      StudFeeClass = Jan;
      break;
    case 'Feb':
      StudFeeClass = Feb;
      break;
      case 'March':
        StudFeeClass = March;
        break;
        case 'April':
          StudFeeClass = April;
          break;
          case 'May':
            StudFeeClass = May;
            break;
            case 'June':
              StudFeeClass = June;
              break;
              case 'July':
                StudFeeClass = July;
                break;
                
                case 'Aug':
                  StudFeeClass = Aug;
                  break;
                  case 'Sept':
                    StudFeeClass = Sept;
                    break;
                    case 'Oct':
                    StudFeeClass = Oct;
                    break;
                    case 'Nov':
                    StudFeeClass = Nov;
                    break;
                    case 'Dec':
                    StudFeeClass = Dec;
                    break;
    // Add cases for other months as needed
    default:
      // Handle the case where the current month doesn't have a corresponding class
      res.redirect("/error");
      return;
  }
  


  // Upload adharCardPhoto to Google Drive


  uploadToGoogleDrive(paymentPhotoFile, folderId, credentials)
    .then(paymentPhotoLink => {
  const studFee = new StudFeeClass( { Reg: req.body.reg,
    Name: req.body.name,
    Email:req.body.email,
    
    Shift: req.body.shift,
    Seat: req.body.seat,
    Date:req.body.date,
    PaymentMethod: req.body.paymentMethod,
    Amount:req.body.amount,
    PaymentPhoto: paymentPhotoLink.webContentLink

     
  });

  studFee.save()
  .then((result) => {
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "edugainersclasses@gmail.com",
        pass: 'uwknsogaphlblqkk'
      }
    });
    
    var mailOptions = {
      from: 'edugainersclasses@gmail.com',
      to: req.body.email,
      subject: 'Regarding Fee Payment',
      html: '<html>' +
      '<body>' +
      '<h1 style="color: #336699;">Thank you, we have received your response!</h1>' +
      '<p style="color: #333;">With Regards,</p>' +
      '<p style="color: #333;">Edugainer\'s Library, Uttarkashi</p>' +
      '<p style="color: #333;">Contact No: 9997999768</p>' +
      '</body>' +
      '</html>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
   
        res.redirect("/appreciate");
      })
    
    })
   
   

   

  .catch((error) => {
    // Handle the error
    console.error(error);
    // Redirect to an error page or display an error message
    res.redirect("/error");
  });})

  app.post("/faq",function(req,res)
  {  const Ques=req.body.ques;
    const ques=new Faqs({
      Question:req.body.ques,
      Answer:""
    

    })

    ques.save()
    .then((found) => {
     
    Faqs.updateOne({Question:req.body.ques},{Answer:"hi,your answer will be provided soon"})
    .then((result ) => {
      Questions.push(result);
      console.log(result);
      console.log(Questions[0]);
      res.redirect("/faq");
    })
     
  })})

app.post("/class-fee", upload.single("paymentPhoto") , function (req, res, next) {
  // Upload the images to Google Drive
  const paymentPhotoFile = req.file;


  // Upload adharCardPhoto to Google Drive
  let paymentPhotoLink;

  uploadToGoogleDrive(paymentPhotoFile, folderId, credentials)
    .then(paymentPhotoLink => {
     
      // Upload photo to Google Drive
    

   
//found document collection
const classStudent = new Students( {
   Reg:req.body.reg,

   Name:req.body.name,
Email:req.body.email,
  Month:req.body.month,
  Batch:req.body.batch,
  Subject:req.body.subject,
  Faculty:req.body.faculty,
  Date:req.body.date,
  PaymentMethod:req.body.paymentMethod,
  Amount:req.body.amount,
  PaymentPhoto: paymentPhotoLink.webContentLink

   
});

classStudent.save()
.then((result) => {

    res.redirect("/appreciate");
})})})

 
  


// Import required modules and setup your app

// Import the uploadToGoogleDrive function

const credentials = {
  client_id: '394820866469-sq2c4ov9u1d600ksvaog81up7r7csv1m.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uris:["http://localhost:3000/auth/google/intro"],
  refresh_token: "1//043yokIjU70_zCgYIARAAGAQSNgF-L9IrgwQ2F3jxNpg8styqaaWxzI_X5AaGZBXbK6fJuGVBh-22stnwR5Oy9A1fNDXWIDyg-Q",
}
// ... Your other code and configurations ...
app.post("/class-reg", upload.fields([
  { name: 'adharCardPhoto' },
  { name: 'photo' }
]), function (req, res, next) {
  // Upload the images to Google Drive
  const adharCardPhotoFile = req.files.adharCardPhoto[0];
  const photoFile = req.files.photo[0];

  // Upload adharCardPhoto to Google Drive
  let adharCardPhotoLink;

  uploadToGoogleDrive(adharCardPhotoFile, folderId, credentials)
    .then(link => {
      adharCardPhotoLink = link;
      // Upload photo to Google Drive
      return uploadToGoogleDrive(photoFile, folderId, credentials);
    })

    .then(photoLink => {
      // Create a new student object with image links and other data
      const newStudent = new ClassRegStudent({
        Reg:req.body.reg,
        Name: req.body.name,
        Gender: req.body.gender,
        Class: req.body.class,
        Subject: req.body.subject,
        Board: req.body.board,
        Faculty: req.body.faculty,
        School: req.body.school,
        Email: req.body.email,
        DOB: req.body.dob,
        Date:req.body.date,
        FatherName: req.body.fatherName,
        MotherName: req.body.motherName,
        ContactNo1: req.body.contactNo1,
        ContactNo2: req.body.contactNo2,
        Address: req.body.address,
        AadharNo: req.body.aadharNo,
        AdharCardPhoto: adharCardPhotoLink.webContentLink
        ,
        PrepareForExam: req.body.prepareForExam,
        Photo:  photoLink.webContentLink,
        
      });

      // Save the newStudent to MongoDB
      return newStudent.save();
    })
    .then(() => {
      // Redirect to the "appreciate" page
      res.redirect("/appreciate");
    })
    .catch(error => {
      // Handle error
      console.error('Error registering student:', error);
      res.status(500).json({ error: 'Failed to register student' });
    });
});

// ... Your other routes and code ...

  

  app.post("/classes-enrolled", function (req, res) {
    const regNo = req.body.reg;
    
    ClassRegStudent.findOne({ Reg: regNo })
        .then((result) => {
     
            if (result.Reg == regNo) {
                res.render("class-fee", { regis: result.Reg,name:result.Name,email:result.Email, facultyName:result.Faculty, ClassVal:result.Class, subject:result.Subject,currentDate:formattedDate,mon:monthName,amount:result.Amount});
            } else {
                const message = "You are not provided any RegNo !! We will provide you soon";
                res.render("classes-enrolled", { errorMessage: message });
            }
        })
        .catch((error) => {
            // Handle the error
            console.error(error);

            const message = "You are not provided any RegNo !! We will provide you soon";
            res.render("classes-enrolled", { errorMessage: message });
        });
});

  
  


// Function to delete inactive users from the registration schema
async function deleteInactiveUsersFromRegistration() {
  try {
    const d = new Date();
    const currentMonth = d.getMonth();

    // Calculate the month indexes for the last three months
    const threeMonthsAgo1 = (currentMonth - 2 + 12) % 12;
    const threeMonthsAgo2 = (currentMonth - 1 + 12) % 12;
    const threeMonthsAgo3 = currentMonth;

    // Find distinct registration numbers in the last three months' collections
    const activeRegNos = await Promise.all([
      Jan.distinct('Reg'),
      Feb.distinct('Reg'),
      March.distinct('Reg'),
      April.distinct('Reg'),
      May.distinct('Reg'),
      June.distinct('Reg'),
      July.distinct('Reg'),
      Aug.distinct('Reg'),
      Sept.distinct('Reg'),
      Oct.distinct('Reg'),
      Nov.distinct('Reg'),
      Dec.distinct('Reg'),
      // Add other months' collections as needed
    ]);

    // Get registration numbers that have been active in any of the last three months
    const activeRegNosLastThreeMonths = new Set([
      ...activeRegNos[threeMonthsAgo1],
      ...activeRegNos[threeMonthsAgo2],
      ...activeRegNos[threeMonthsAgo3],
    ]);

    // Find and delete inactive users from the registration schema
    const inactiveUsers = await LibstudData.find({
      Reg: { $nin: [...activeRegNosLastThreeMonths] },
      Status: 'Inactive',
    });

    // Delete the records of inactive users
    for (const user of inactiveUsers) {
      await user.remove();
    }
  } catch (error) {
    console.error('Error deleting inactive users from registration:', error);
  }
}



async function checkAndUpdateFeePaymentStatus() {
  try {
    const d = new Date();
    const currentDate = d.getDate();
    const currentMonth = d.getMonth() ; // Note: getMonth() returns 0-11
   
    const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
   
  const mon=monthArray[currentMonth];
    let monthName;
    switch (mon) {
      case 'Jan':
        monthName = Jan;
        break;
      case 'Feb':
        monthName = Feb;
        break;
        case 'March':
          monthName = March;
          break;
          case 'April':
            monthName = April;
            break;
            case 'May':
              monthName = May;
              break;
              case 'June':
                monthName = June;
                break;
                case 'July':
                  monthName = July;
                  break;
                  
                  case 'Aug':
                    monthName = Aug;
                    break;
                    case 'Sept':
                      monthName = Sept;
                      break;
                      case 'Oct':
                      monthName = Oct;
                      break;
                      case 'Nov':
                      monthName = Nov;
                      break;
                      case 'Dec':
                      monthName = Dec;
                      break;
      // Add cases for other months as needed
      default:
    // Check if the current date is between 1st and 5th of the month
    if (currentDate >= 1 && currentDate <= 5) {
      // Get all students from libregisdatas with status "active"
      const activeStudents = await LibstudData.find({ Status: 'Active' });

      for (const student of activeStudents) {
        // Find the student's fee payment record for the current month
        const feeRecord = await monthName.findOne({ Reg: student.Reg }); // Assuming you have collections for each month (Jan, Feb, etc.)

        // If fee payment record for the current month is not found, mark the student as "inactive"
        if (!feeRecord ) {
          student.Status = 'Inactive';
          await student.save();
        }
      }
    }
  } }catch (error) {
    console.error('Error checking and updating fee payment status:', error);
  }
}



async function updateStatus() {
  try {
    const d = new Date();
    const currentDate = d.getDate();
    const currentMonth = d.getMonth() ; // Note: getMonth() returns 0-11
   
    const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
   
  const mon=monthArray[currentMonth];
    let monthName;
    switch (mon) {
      case 'Jan':
        monthName = Jan;
        break;
      case 'Feb':
        monthName = Feb;
        break;
        case 'March':
          monthName = March;
          break;
          case 'April':
            monthName = April;
            break;
            case 'May':
              monthName = May;
              break;
              case 'June':
                monthName = June;
                break;
                case 'July':
                  monthName = July;
                  break;
                  
                  case 'Aug':
                    monthName = Aug;
                    break;
                    case 'Sept':
                      monthName = Sept;
                      break;
                      case 'Oct':
                      monthName = Oct;
                      break;
                      case 'Nov':
                      monthName = Nov;
                      break;
                      case 'Dec':
                      monthName = Dec;
                      break;
      // Add cases for other months as needed
      default:
    // Check if the current date is between 1st and 5th of the month
 
      // Get all students from libregisdatas with status "active"
      const inactiveStudents = await LibstudData.find({ Status: 'Inactive' });

      for (const student of inactiveStudents) {
        // Find the student's fee payment record for the current month
        const feeRecord = await monthName.findOne({ Reg: student.Reg }); // Assuming you have collections for each month (Jan, Feb, etc.)

        // If fee payment record for the current month is not found, mark the student as "inactive"
        if (feeRecord ) {
          student.Status = 'Active';
          await student.save();
        }
      }
    }
  } catch (error) {
    console.error('Error checking and updating fee payment status:', error);
  }
}

// Schedule the task to run on the 6th of every month at 1:00 AM in the Asia/Kolkata timezone
cron.schedule('0 1 6 * *', () => {
  const currentMonth = monthName; // Replace monthName with the current month name
  checkAndUpdateFeePaymentStatus();
  // Call this function for each month with the respective month model
}, {
  timezone: 'Asia/Kolkata',
});

// Schedule the task to run on the 11th of every month at 1:00 AM in the Asia/Kolkata timezone
cron.schedule('0 1 11 * *', () => {
  const currentMonth = monthName; // Replace 'monthName' with the current month name
  checkAndUpdateFeePaymentStatus();
  // Call this function for each month with the respective month model
}, {
  timezone: 'Asia/Kolkata',
});

cron.schedule('* * * * *', () => {
  const currentMonth = monthName; // Replace 'monthName' with the current month name
 updateStatus()
  // Call this function for each month with the respective month model
}, {
  timezone: 'Asia/Kolkata',
});


// // Function to delete inactive users from the registration schema
// async function deleteInactiveUsersFromRegistration() {
//   try {
//     const d = new Date();
//     const currentMonth = d.getMonth();

//     // Calculate the month indexes for the last three months
//     const threeMonthsAgo1 = (currentMonth - 2 + 12) % 12;
//     const threeMonthsAgo2 = (currentMonth - 1 + 12) % 12;
//     const threeMonthsAgo3 = currentMonth;

//     // Find distinct registration numbers in the last three months' collections
//     const activeRegNos = await Promise.all([
//       Jan.distinct('Reg'),
//       Feb.distinct('Reg'),
//       March.distinct('Reg'),
//       April.distinct('Reg'),
//       May.distinct('Reg'),
//       June.distinct('Reg'),
//       July.distinct('Reg'),
//       Aug.distinct('Reg'),
//       Sept.distinct('Reg'),
//       Oct.distinct('Reg'),
//       Nov.distinct('Reg'),
//       Dec.distinct('Reg'),
//       // Add other months' collections as needed
//     ]);

//     // Get registration numbers that have been active in any of the last three months
//     const activeRegNosLastThreeMonths = new Set([
//       ...activeRegNos[threeMonthsAgo1],
//       ...activeRegNos[threeMonthsAgo2],
//       ...activeRegNos[threeMonthsAgo3],
//     ]);

//     // Find and delete inactive users from the registration schema
//     const inactiveUsers = await LibstudData.find({
//       Reg: { $nin: [...activeRegNosLastThreeMonths] },
//       Status: 'Inactive',
//     });

//     // Delete the records of inactive users
//     for (const user of inactiveUsers) {
//       await user.remove();
//     }
//   } catch (error) {
//     console.error('Error deleting inactive users from registration:', error);
//   }
// }
cron.schedule('0 1 * * *', () => {
  deleteInactiveUsersFromRegistration();
}, {
  timezone: 'Asia/Kolkata', // Replace 'Your_Timezone' with your desired timezone (e.g., 'America/New_York')
});

app.listen(process.env.PORT || 3000,function()
{
    console.log("server is running on port 3000");
})