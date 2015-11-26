var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: 		{type: String},
	password: 		{type: String},
	likes: 			{type: [String], 'default': []}
});

UserSchema.virtual('email')
	.get(function(){
		return this.userName + '@fake.thing';
	});

module.exports = mongoose.model('User', UserSchema);