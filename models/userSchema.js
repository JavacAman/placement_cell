const mongoose = require('mongoose');

//Bcrypt turns a simple password into fixed-length characters called a hash. 
//Before hashing a password, bcrypt applies a salt — a unique random string that makes the hash unpredictable
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// create a virtual property to set hashed password
userSchema.virtual('password').set(function (value) {
	this.passwordHash = bcrypt.hashSync(value, 12);
});

// function to compare hashed password
userSchema.methods.isPasswordCorrect = function (password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
