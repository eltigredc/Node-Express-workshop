// DEPENDENCIES
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose');

// VARIABLES
const app = express();
const port = 3000

//SETUP
app.set('view engine','ejs');
app.use(expressEjsLayout);
app.use("/static", express.static("public"));

//DATABASE SETUP
mongoose.connect('mongodb+srv://snoopDiog:diogodiogodiogo@cluster0.pz7jo9z.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('I just connected to your DB, And ready to rumble'))
.catch((err)=> console.log(err));

// ROUTES
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/profile', (req, res) => {
  res.render('users/login');
})

// SERVER
app.listen(port, () => {
  console.log(`congratulations your app is listening on port ${port}`)
})