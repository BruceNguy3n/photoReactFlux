var express = require('express'),
	config = require('./server/configure'),
	app = express(),
	mongoose = require('mongoose');

app.set('port', process.env.PORT || 3301);
app = config(app);

mongoose.connect('mongodb://localhost/photoReactDB');
mongoose.connection.on('open', function() {
	console.log('Mongoose connected.');
});

var server = app.listen(app.get('port'), function() {
	console.log('Server up - listening on port: ' + app.get('port'));
});