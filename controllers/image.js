var fs = require('fs'),
	path = require('path'),
	sidebar = require('../helpers/sidebar'),
	Models = require('../models'),
	md5 = require('MD5');

module.exports = {
	index: function(req, res){
		var viewModel = {
			image: {},
			comments:[]
		};

		Models.Image.findOne({filename: {$regex: req.params.image_id}}, 
			function(err, image){
				if(err) {throw err;}

				if(image){
					image.views++;
					viewModel.image = image;
					image.save();

					Models.Comment.find({image_id: image._id}, {},
						{sort: {'timestamp' : 1}}, function(err, comments){
							viewModel.comments = comments;
							sidebar(viewModel, function(viewModel){
								res.json(viewModel);
							});
						});
				} else{
					res.json({error: err});
				}
			});
	},
	create: function(req, res){
		var saveImage = function(){
			var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
				imgUrl = '';

			for(var i = 0; i < 6; i++){
				imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
			}

			Models.Image.find({filename: imgUrl}, function(err, images){
				if(images.length > 0){
					saveImage();
				}else{
					var tempPath = req.files.file.path,
					ext = path.extname(req.files.file.name).toLowerCase(),
					targetPath = path.resolve('./public/upload/' + imgUrl + ext);

					if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext ==='.jpe' 
						|| ext === '.gif'){
						fs.rename(tempPath, targetPath, function(err){
							if(err) { throw err; }

							var newImg = new Models.Image({
								title: req.body.title,
								filename: imgUrl + ext,
								description: req.body.description,
								user_id: req.body.user_id
							});
							newImg.save(function(err, image){
								console.log('Successfully inserted image: ' + image.filename);
								res.json({image: image});
							});
						});
					} else {
						fs.unlink(tempPath, function(err){
							if(err) throw err;

							res.json(500, {error: 'Only image files are allowed.'});
						});
					}
				}
			});
		};

		saveImage();
	},
	like: function(req, res){
		Models.Image.findOne({filename: {$regex: req.body.filename}},
			function(err, image){
				if(!err && image){
					image.likes++;
					image.save(function(err){
						if(err){
							res.json(err);
						} else {
							res.json({likes: image.likes});
						}
					});
				}
			});
	},
	comment: function(req, res){
		Models.Image.findOne({filename: {$regex: req.body.imagename}},
			function(err, image){
				if(!err && image){
					var newComment = new Models.Comment();
					newComment.comment = req.body.comment;
					newComment.name = req.body.username;
					newComment.email = req.body.username + '@.fake.com';
					newComment.gravatar = md5(newComment.email);
					newComment.image_id = image._id;
					newComment.save(function(err, comment){
						if(err) { throw err; }

					});
				} else {
					console.log("Error");
				}
			});
	},
	remove: function(req, res){
		var password = req.body.password;

		if(password && password === 'abc@321')
		{
			Models.Image.findOne({filename: {$regex: req.params.image_id}},
				function(err, image){
					if(err) { throw error; }

					fs.unlink(path.resolve('./public/upload/' + image.filename),
						function(err){
							if(err) { throw err; }

							Models.Comment.remove({image_id: image._id},
								function(err){
									image.remove(function(err){
										if(!err){
											res.json(true);
										}else{
											res.json(false);
										}
									})
								});
						});
				});
		} else {
			res.json(false);
		}
	}
};