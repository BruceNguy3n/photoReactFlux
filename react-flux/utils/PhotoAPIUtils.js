var $ = require('jQuery');
var LoginActionCreator = require('../actions/LoginActionCreator');
var HomeActionCreator = require('../actions/HomeActionCreator');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

HomeActionCreator.goToImagePage = function(image) {
		AppDispatcher.dispatch({
			type: ActionTypes.DISPLAY_IMAGE_PAGE,
			data: image
	});
};

HomeActionCreator.commentsReceive = function(data) {
	AppDispatcher.dispatch({
		type: ActionTypes.COMMENT_RECEIVE,
		data: data
	});
};

module.exports = {

	likePhoto: function(data) {
		$.ajax({
			type: "POST",
			url: "/image/like",
			data: data,
			dataType: "json"
		}).done(function(data){

		}).fail(function(jqXHR, status){
			console.log('Something goes wrong. ' + status);
		});
	},

	uploadPhoto: function(form) {
		$.ajax({
			type: "POST",
			url: "/image",
			data: form,
			contentType: false,
			processData: false
		}).done(function(data){
			HomeActionCreator.goToImagePage(data.image);
		}).fail(function(jqXHR, status){
			console.log('Something goes wrong. ' + status);
		});
	},

	getCommentsForImage: function(image) {
		$.ajax({
			type: "GET",
			url: "/image/" + image.filename,
			dataType: "json"
		}).done(function(data){
			HomeActionCreator.commentsReceive(data);
		}).fail(function(jqXHR, status){
			console.log('Something goes wrong. ' + status);
		});
	},

	postComment: function(data) {
		$.ajax({
			type: "POST",
			url: "/image/comment",
			dataType: "json",
			data: data
		}).done(function(data){

		}).fail(function(jqXHR, status){
			console.log('Something goes wrong. ' + status);
		});
	}
};