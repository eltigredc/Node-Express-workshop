const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post");
const cloudinary = require("../config/cloudinary");

const create = async (req, res) => {
	try {
	    // Upload image to cloudinary
	    const result = await cloudinary.uploader.upload(req.file.path);
	    // Create new user
	    let post = new Post({
	      name: req.body.name,
	      desc: req.body.desc,
	      img_url: result.secure_url,
	    });
	    // save post details in mongodb
	    await post.save();
	    res.status(200)
	      .send({
	        post
	      });
	  } catch (err) {
	    console.log(err);
	  }
}


module.exports = { create }