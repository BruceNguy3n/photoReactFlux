var Models = require('../models');


module.exports = {
	create: function(req, res) {
		Models.User.findOne({userName: {$regex: req.body.username}}, 
			function(err, user) {
				if(!err && !user) {
					var newUser = new Models.User({
						userName: req.body.username,
						password: req.body.password
					});

					newUser.save(function(err, usr){
						if(err) {throw err;}

						res.json({result: 'success', data: usr});
					});
				} else {
					res.json({result: 'failure', data: user.userName});
				}
			}
		);
	},
	login: function(req, res) {
		Models.User.findOne({userName: {$regex: req.body.username}, 
			password: {$regex: req.body.password}}, 
			function(err, user){
				if(!err && user) {
					res.json({data: user});
				} else {
					res.json({data: null});
				}
			});
	}
};