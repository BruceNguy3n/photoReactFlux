var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
	image_id: 		{type: ObjectId},
	image: 			{type: Object},
	email: 			{type: String},
	name: 			{type: String},
	comment: 		{type: String},
	gravatar: 		{type: String},
	timestamp: 		{type: Date, 'default': Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);