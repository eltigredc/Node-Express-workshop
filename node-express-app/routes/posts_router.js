// const express = require('express');
// const router = express.Router();
// const create = require('../controllers/posts_controller.js').create
// const multer = require("multer");



// // SET STORAGE
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage })



// router.get('/new',(req,res)=>{
//     res.render('posts/new');
// })

// router.post('/create', upload.single('img'), (req,res) => create(req,res))


// module.exports  = router;