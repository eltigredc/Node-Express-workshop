// DEPENDENCIES
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose');
const passport = require("passport")
const session = require("express-session")
const {ensureAuthenticated} = require('./config/auth')
const bodyParser = require("body-parser");
require('dotenv').config()


// VARIABLES
const app = express();
const port = 3000

//SETUP
require('./config/passport')(passport)
app.set('view engine','ejs');
app.use(expressEjsLayout);
app.use("/static", express.static("public"));
app.use(express.urlencoded({extended : false}));
app.use(express.json())
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended:true }))



//DATABASE SETUP
mongoose.connect('mongodb+srv://diogo:diogodiogodiogo@cluster0.e5efhnb.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('I just connected to your DB, And ready to rumble'))
.catch((err)=> console.log(err));

// ROUTES
app.use('/users',require('./routes/users_router'));
app.use('/posts',require('./routes/posts_router'));


app.get('/', ensureAuthenticated, (req, res) => {
  res.render('home');
})

app.get('/profile', (req, res) => {
  res.render('users/profile');
})



// SERVER
app.listen(port, () => {
  console.log(`congratulations your app is listening on port ${port}`)
})