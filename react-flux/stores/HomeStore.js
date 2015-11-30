import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import assign from 'object-assign';
import AuthStore from '../stores/AuthStore';
var EventEmitter = require('events').EventEmitter;

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var _allData = null;
var _pageName = 'uploadPage';
var _image = null;
var _comments = [];

var HomeStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeChangeListener(CHANGE_EVENT, callback);
	},

	getAllData: function() {
		return _allData;
	},

	getPageName: function() {
		return _pageName;
	},
	
	getImage: function() {
		return _image;
	},

	getComments: function() {
		return _comments;
	}
});

HomeStore.dispatchToken = AppDispatcher.register(function(action) {
	AppDispatcher.waitFor([AuthStore.dispatchToken]);

	switch(action.type) {
		case ActionTypes.FETCH_DATA:
			_allData = action.data;
			HomeStore.emitChange();
			break;
		case ActionTypes.LOG_OUT:
			_pageName = 'uploadPage';
			HomeStore.emitChange();
			break;
		case ActionTypes.DISPLAY_UPLOAD_PAGE:
			_pageName = 'uploadPage';
			HomeStore.emitChange();
			break;
		case ActionTypes.DISPLAY_IMAGE_PAGE:
			_pageName = 'imagePage';
			_image = action.data;
			HomeStore.emitChange();
			break;
		case ActionTypes.COMMENT_RECEIVE:
			_comments = action.data.comments;
			HomeStore.emitChange();
			break;
		case ActionTypes.NEW_COMMENT_ADDED:
			_comments = action.data.comments;
			console.log(_comments);
			HomeStore.emitChange();
			break;
		case ActionTypes.GET_COMMENTS_FOR_IMAGE:
			HomeStore.emitChange();
			break;
		case ActionTypes.CREATE_PHOTO:
			HomeStore.emitChange();
			break;
		case ActionTypes.POST_COMMENT:
			HomeStore.emitChange();
			break;
		case ActionTypes.LIKE_PHOTO:
			HomeStore.emitChange();
			break;
	}

});

module.exports = HomeStore;