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

const https = require("https");
const sharp = require('sharp');


const FacebookStrategy = require('passport-facebook');


const cron = require('node-cron');




// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain

// Assuming you have a buffer named 'bufferData'



const storage=multer.memoryStorage({
  destination:function(req,file,cb){
    return cb(null,"uploads");
    //cb coinatins two fields err and folder name
  },//tells destiantion of storing images,file is user uploaded and cb is callback fxn when task execute 
  filename:function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`)//err is null// appends date with file name to avoid creating and replacing file with same name
  }
})
 
const upload=multer({storage})
 
const Questions=[];


 
//Image is a model which has a schema imageSchema
 






	
// View Engine Setup

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
	app.use(express.json())
  app.use(express.urlencoded({extended:false}));

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

mongoose.connect("mongodb+srv://shashankpant94115:GRH5bml8Foua6trK@cluster1.ctxv50a.mongodb.net/userDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the MongoDB server')});
//creating a schema for our collection
 
const userSchema=new mongoose.Schema({
  email:String,
  password:String,
  
  googleId:String,
  
})
const studRegisDetailSchema=new mongoose.Schema({
  Name:String,
  Gender:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  DOB:Date,
  FatherName:String,
  MotherName:String,
  ContactNo1:Number,
  ContactNo2:Number,
  Address:String,
  AadharNo:Number,
  AdharCardPhoto:{
    data: Buffer,
    contentType: String
},
  PrepareForExam:String,
  Shift:String,
  Photo:
  {
      data: Buffer,
      contentType: String
  },
  PaymentMethod:String,
  UploadPaymentScreenshot:  {
    data: Buffer,
    contentType: String
},
Seat:Number,
Amount:String,
Reg:String
})

//reading from google sheets
const d = new Date();
  const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let Mon = month[d.getMonth()];
//jan
const JanSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
//feb
const FebSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const MarchSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const AprilSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}})

const MaySchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
  

const JuneSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const JulySchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const AugustSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const SeptSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const OctSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const NovSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})
const DecSchema=new mongoose.Schema({
  RegNO:String,
  Name:String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address'
    }
  },
  Shift:String,
  Seat:String,
  PaymentMethod:String,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}

 
  
})

const classStudFee=new mongoose.Schema({
  Reg:String,
  Name:String,
ContactNo:Number,
  Month:String,
  Batch:String,
  Subject:String,
  Faculty:String,
  PaymentMethod:String,
  Amount:Number,
  PaymentPhoto: {
    data: Buffer,
    contentType: String
}


  
})
const classRegisStud=new mongoose.Schema({
  Reg:String,
  Name:String,
  Gender:String,
Class:String,
Subject:String,
Board:String,
Faculty:String,
School:String,
  email:String,
  DOB:Date,
  FatherName:String,
  MotherName:String,
  ContactNo1:Number,
  ContactNo2:Number,
  Address:String,
  AadharNo:Number,
  AdharCardPhoto:{
    data: Buffer,
    contentType: String
},
  PrepareForExam:String,
  
  Photo:
  {
      data: Buffer,
      contentType: String
  },




})

 
  


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

app.get("/",function(req,res)
{cron.schedule('28 15 * * *', () => {
  var transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: "edugainersclasses@gmail.com",
      pass: 'uwknsogaphlblqkk'
    }
  });
  
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
app.get("/faq",function(req,res)
{
  res.render("faq",{QuestionsArray:Questions});
})
app.get("/classes-enrolled",function(req,res)
{const reg="";
const error="";
  res.render("classes-enrolled",{errorMessage:error,regis:reg});
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
res.render("intro")

    
})
     




app.get("/library", function(req, res) {
  // Use the Mongoose aggregate method to group and count documents by the "Shift" field
  LibstudData.aggregate([
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
    ["9 PM to 6 AM", "2 PM to 11 PM", "7 AM to 7 PM", "24*7","2 PM to 9 PM","7 PM to 11 PM","7 AM to 2 PM"].forEach((shift) => {
      seatsAvailable[shift] = 0;
    });
    result.forEach((item) => {
     
      if(item.count!=0){
      seatsAvailable[item._id] = item.count;}
 else
      {
        seatsAvailable[item._id] = 0;
      }
    });

    // Pass the seatsAvailable object to your template for rendering on the website
    res.render("library", { seats:seatsAvailable});
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  });
});

app.get("/Shift",function(req,res)
{
//found document collection
    res.render("Shift");
})

app.get("/already-regis",function(req,res)
{
    res.render("already-regis",{errorMessage:""});
})
app.get("/new-regis",function(req,res)
{ 

//found document collection
  res.render("new-regis");
    
})
app.get("/payment",function(req,res)
{const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
const mon = month[d.getMonth()];
//found document collection
    res.render("payment",{monthName:mon});
})
app.get("/thanku",function(req,res)
{
//found document collection
    res.render("thanku");
})
app.get("/classes",function(req,res)
{
//found document collection
    res.render("classes");
})
app.get("/Batches",function(req,res)
{
//found document collection
    res.render("Batches");
})
app.get("/class-reg",function(req,res)
{
//found document collection
    res.render("class-reg");
})
app.get("/class-fee",function(req,res)
{const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
const mon = month[d.getMonth()];
//found document collection
const reg="";
    res.render("class-fee",{monthName:mon,regis:reg});
    const Teachers=["ATP_Sir","AmanDev_Sir","ShekherPant_Sir","Amit_Sir","Akansha_Mam"];

})

app.get("/appreciate",function(req,res)
{
//found document collection
    res.render("appreciate");
})
app.get("/contact",function(req,res)
{
//found document collection
 
res.render("contact");
}
)


app.get("/class-regis",function(req,res)
{
  res.render("class-regis");
})


app.post("/already-regis", function(req, res) {
  const regNO = req.body.reg;

  LibstudData.findOne({ Reg: regNO })
    .then((result) => {
      console.log(result.Reg);
      console.log(regNO);
      if (result.Reg == regNO) {

        res.redirect("/payment");
        
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


//   app.get("/logout",function(req,res)
// {req.logout(function(err)//it log ut user from our website only and not from google or any third party website,for that we will nedd a soecial button that lead  them to that logout route 
// //but it will logout from entire third party services like google maps gmail etc
//   {
//     if (err) {console.log(err); }
//     res.redirect('/');
//   });
  
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
]), function(req, res, next) {
  

    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
  const   name=req.body.name
  const  Shift=req.body.shift
  const  address=req.body.address
  const  contact=req.body.contactNo1

  const stud = new LibstudData({
   
    Name: req.body.name,
    email:req.body.email,
    Gender: req.body.gender,
    DOB: req.body.dob,
    FatherName: req.body.fatherName,
    MotherName: req.body.motherName,
    ContactNo1: req.body.contactNo1,
    ContactNo2: req.body.contactNo2,
    Address: req.body.address,
    AadharNo: req.body.aadharNo,
    AdharCardPhoto: {
      data: req.files.adharCardPhoto[0].buffer,
      contentType: req.files.adharCardPhoto[0].mimetype
    },
    PrepareForExam: req.body.prepareForExam,
    Shift: req.body.shift,
    Amount:req.body.amount,
    Photo: {
      data: req.files.photo[0].buffer,
      contentType: req.files.photo[0].mimetype
    },
    PaymentMethod: req.body.paymentMethod,
    UploadPaymentScreenshot: {
      data: req.files.uploadPaymentScreenshot[0].buffer,
      contentType: req.files.uploadPaymentScreenshot[0].mimetype
    },
  
  });
  // const data = fs.readFileSync(req.files.photo[0].path)

  // res.render('thanku', {
  //   image: data.toString('base64')
  // })

  
  stud.save()
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
        }
      });
      
      
    })
  });

app.post("/already-regis", function(req, res) {
  const regNO = req.body.reg;


  LibstudData.findOne({ Reg: regNO })
    .then((result) => {
      if (result.Reg == regNO) {
        res.redirect("/payment");
      } else {
        res.render("payment",{errorMessage:""}); // Render a "not-found" view if the document is not found
      }
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
      res.redirect("/library"); // Redirect to an error page or display an error message
    });
});
app.post("/payment", upload.single("paymentPhoto") ,(req,res) => {
  console.log(req.body);
  console.log(req.file);
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
  const studFee = new StudFeeClass( { Reg: req.body.regNO,
    Name: req.body.name,
    email:req.body.email,
    Month: req.body.month,
    Shift: req.body.shift,
    Seat: req.body.seat,
    PaymentMethod: req.body.paymentMethod,
    PaymentPhoto: {data: req.file.buffer,

      contentType:req.file.mimetype}

     
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

app.post("/class-fee", upload.single("paymentPhoto") ,(req,res) => {

//found document collection
const classStudent = new Students( { 
   Name:req.body.name,
ContactNo:req.body.contact,
  Month:req.body.month,
  Batch:req.body.batch,
  Subject:req.body.subject,
  Faculty:req.body.faculty,
  PaymentMethod:req.body.paymentMethod,
  Amount:req.body.amount,
  PaymentPhoto: {
    data: req.file.buffer,

      contentType:req.file.mimetype
}
   
});

classStudent.save()
.then((result) => {

    res.redirect("/appreciate");
})})
 
app.post("/class-reg", upload.fields([
  { name: 'adharCardPhoto' },
  { name: 'photo'}

]), function(req, res, next) 

{const newStudent=new ClassRegStudent({

  Name:req.body.name,
  Gender:req.body.gender,
Class:req.body.class,
Subject:req.body.subject,
Board:req.body.board,
Faculty:req.body.faculty,
School:req.body.school,
  email: req.body.email,
  
  DOB:req.body.dob,
  FatherName:req.body.fatherName,
  MotherName:req.body.motherName,
  ContactNo1:req.body.contactNo1,
  ContactNo2:req.body.contactNo2,
  Address:req.body.address,
  AadharNo:req.body.adhaarNo,
  AdharCardPhoto: {
    data: req.files.adharCardPhoto[0].buffer,
    contentType: req.files.adharCardPhoto[0].mimetype
  },
  PrepareForExam: req.body.prepareForExam,
  
  
  Photo: {
    data: req.files.photo[0].buffer,
    contentType: req.files.photo[0].mimetype
  },


})
// const data = fs.readFileSync(req.files.photo[0].path)

// res.render('thanku', {
//   image: data.toString('base64')
// })


newStudent.save()
  .then((result) => { 
    
    
   

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "edugainersclasses@gmail.com",
        pass: 'uwknsogaphlblqkk'
      }
    })
  ;
    
    var mailOptions = {
      from: 'edugainersclasses@gmail.com',
      to: req.body.email,
      subject: "Regarding registration for the EduGainer's Library ",
      html: '<html>' +
      '<body>' +
      '<h1 style="color: Green;">Thank you for registering with us.</h1>' +
       ' <p style="color:Blue;">&#128591;</p>'+   ' <p style="color:Blue;">We will contact You soon to provide a unique <mark>Reg No</mark> !!!</p>'+'<br>'+
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
    
    
    res.redirect("/appreciate");
   } )

    ;
  })


  app.post("/classes-enrolled", function (req, res) {
    const regNo = req.body.reg;

    ClassRegStudent.findOne({ Reg: regNo })
        .then((result) => {
          const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
const mon = month[d.getMonth()];
            if (result.Reg == regNo) {
                res.render("class-fee", { regis: result.Reg, monthName:mon, facultyName:result.Faculty, ClassVal:result.Class, subject:result.Subject});
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

  
  



app.listen(3000,function()
{
    console.log("server is running on port 3000");
})