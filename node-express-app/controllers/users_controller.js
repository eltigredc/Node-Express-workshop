const register = (req, res) => {
	const {username,email, password, password_confirmation} = req.body;
	console.log(' username ' + username  + ' email :' + email + ' pass:' + password);
} 


module.exports = {register};