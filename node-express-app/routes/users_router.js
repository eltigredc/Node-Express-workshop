// DEPENDENCIES
const express = require('express');
const router = express.Router();
const register = require('../controllers/users_controller.js').register


router.post('/register',(req,res) => register(req,res))

router.get('/login',(req,res)=>{
    res.render('users/login');
})

router.get('/register',(req,res)=>{
   res.render('users/register')
})

module.exports  = router;