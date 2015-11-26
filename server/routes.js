var user = require('../controllers/user');
var home = require('../controllers/home');
var image = require('../controllers/image');

module.exports.initialize = function(app) {
   app.post('/user', user.create);
   app.post('/userlogin', user.login);
   app.get('/', home.index);
   app.get('/image/:image_id', image.index);
   app.post('/image', image.create);
   app.post('/image/comment', image.comment);
   app.post('/image/like', image.like);
};
