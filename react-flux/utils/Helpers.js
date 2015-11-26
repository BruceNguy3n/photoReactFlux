var moment = require('moment');

module.exports = {
	timeago: function(timestamp) {
		return moment(timestamp).startOf('minute').fromNow();
	}
}