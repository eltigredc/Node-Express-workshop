const express = require("express");

const mongoose = require("mongoose");
const Post = require("../models/post");
const fs = require("fs");





const create = (req, res) => {
	var img = fs.readFileSync(req.file.path);
	var encode_img = img.toString('base64');
	var final_img = {
	    contentType:req.file.mimetype,
	    image:new Buffer(encode_img,'base64')
	};
	console.log(final_img)
	// Post.create(final_img,function(err,result){
	//     if(err){
	//         console.log(err);
	//     }else{
	//         console.log(result.img.Buffer);
	//         console.log("Saved To database");
	//         res.contentType(final_img.contentType);
	//         res.send(final_img.image);
	//     }
	// })

}



module.exports = { create }