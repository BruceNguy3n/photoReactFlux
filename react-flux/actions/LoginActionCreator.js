import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import WebAPIUtils from '../utils/WebAPIUtils';

var ActionTypes = Constants.ActionTypes;

module.exports = {
	displayLoginForm: function() {
		AppDispatcher.dispatch({
			type: ActionTypes.DISPLAY_LOGIN_FORM
		});
	},
	displayCreateAccountForm: function() {
		AppDispatcher.dispatch({
			type: ActionTypes.DISPLAY_CREATE_ACCOUNT_FORM
		});
	},
	createAccount: function(user) {
		AppDispatcher.dispatch({
			type: ActionTypes.CREATE_ACCOUNT,
			user: user
		});

		WebAPIUtils.createAccount(user);
	},
	login: function(credentials) {
		AppDispatcher.dispatch({
			type: ActionTypes.LOG_IN,
			data: credentials
		});

		WebAPIUtils.login(credentials);
		WebAPIUtils.fetchAllData();
	},
	logout: function(){
		AppDispatcher.dispatch({
			type: ActionTypes.LOG_OUT
		});
	}
};