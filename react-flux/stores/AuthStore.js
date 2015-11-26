import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import WebAPIUtils from '../utils/WebAPIUtils';
import assign from 'object-assign';
var EventEmitter = require('events').EventEmitter;

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _loginResult = null;
var _formName = 'signIn';
var _user = null;

var AuthStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeChangeListener(CHANGE_EVENT, callback);
	},

	getAuthResult: function() {
		return _loginResult;
	},

	getFormName: function() {
		return _formName;
	},

	getUser: function() {
		return _user;
	}
	
});

AuthStore.dispatchToken = AppDispatcher.register(function(action) {

	switch(action.type) {

		case ActionTypes.LOG_IN:
			AuthStore.emitChange();
			break;
		case ActionTypes.LOGIN_SUCCESS:
			_user = action.data;
			AuthStore.emitChange();
			break;
		case ActionTypes.LOG_OUT:
			_user = null;
			AuthStore.emitChange();
		case ActionTypes.DISPLAY_LOGIN_FORM:
			_formName = 'signIn';
			AuthStore.emitChange();
			break;
		case ActionTypes.DISPLAY_CREATE_ACCOUNT_FORM:
			_formName = 'createAccount';
			AuthStore.emitChange();
			break;
		case ActionTypes.CREATE_ACCOUNT:
			AuthStore.emitChange();
			break;
		case ActionTypes.ACCOUNT_CREATED:
			_user = action.data;
			AuthStore.emitChange();
			break;
	}

});

module.exports = AuthStore;