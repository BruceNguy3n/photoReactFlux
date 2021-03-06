var connect = require('connect'),
	path = require('path'),
	routes = require('./routes');

module.exports = function(app) {

	app.use(connect.logger('dev'));
    app.use(connect.bodyParser({
        uploadDir:path.join(__dirname, '../public/upload/temp')
    }));
    app.use(connect.json());
    app.use(connect.urlencoded());
    app.use(connect.methodOverride());
    app.use(connect.cookieParser('some-secret-value-here'));
    app.use(app.router);
    app.use('/public/', connect.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(connect.errorHandler());
    }

    routes.initialize(app);

    return app;
}