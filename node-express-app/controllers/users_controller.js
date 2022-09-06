//DEPENDENCIES
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport")


const register = (req, res) => {
	const {username,email, password, password_confirmation} = req.body;
	console.log(' username ' + username  + ' email :' + email + ' pass:' + password);

	const errors = []

	// check if all fields have been filled
	if(!username || !email || !password || !password_confirmation) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password_confirmation) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }

    if(errors.length > 0 ) {
    res.render('users/register', {
        errors : errors,
        username : username,
        email : email,
        password : password,
        password_confirmation : password_confirmation})
     }else{
        User.findOne({email : email}).exec((err,user)=>{
          console.log(user);
          if(user) {
          	errors.push({msg: 'email already registered'});
            res.render('register',{errors,username,email,password,password_confirmation})
          }else{
            const newUser = new User({
                username : username,
                email : email,
                password : password
            });

            //hash password
            bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        // req.flash('success_msg','You have now registered!');
                        res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));

                }));
          }
        })
     }

} 


const login = (req, res, next) => {
	passport.authenticate('local',{
	    successRedirect : '/',
	    failureRedirect: '/users/login',
	    failureFlash : true
	})(req,res,next)
}

module.exports = {register, login};