// DEPENDENCIES
const express = require('express');
const router = express.Router();
const register = require('../controllers/users_controller.js').register
const login = require('../controllers/users_controller.js').login

router.post('/register',(req,res) => register(req,res))
router.post('/login',(req,res, next) => login(req,res,next))

router.get('/login',(req,res)=>{
    res.render('users/login');
})

router.get('/register',(req,res)=>{
   res.render('users/register')
})

module.exports  = router;