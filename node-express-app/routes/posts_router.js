const express = require('express');
const router = express.Router();
const create = require('../controllers/posts_controller.js').create
const upload = require("../config/multer");

router.get('/new',(req,res)=>{
    res.render('posts/new');
})

router.post('/create', upload.single("img"),(req,res) => create(req,res))


module.exports  = router;