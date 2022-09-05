// DEPENDENCIES
const express = require('express');
const expressEjsLayout = require('express-ejs-layouts')

// VARIABLES
const app = express();
const port = 3000

//SETUP
app.set('view engine','ejs');
app.use(expressEjsLayout);
app.use("/static", express.static("public"));

// ROUTES
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/profile', (req, res) => {
  res.render('profile');
})

// SERVER
app.listen(port, () => {
  console.log(`congratulations your app is listening on port ${port}`)
})