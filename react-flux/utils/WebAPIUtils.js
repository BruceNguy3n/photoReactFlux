var $ = require('jQuery');
var LoginActionCreator = require('../actions/LoginActionCreator');
var HomeActionCreator = require('../actions/HomeActionCreator');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

LoginActionCreator.createAccountSuccessful = function(user) {
		AppDispatcher.dispatch({
			type: ActionTypes.ACCOUNT_CREATED,
			data: user
		});
};

LoginActionCreator.loginSuccessful = function(user) {
	AppDispatcher.dispatch({
		type: ActionTypes.LOGIN_SUCCESS,
		data: user
	});
};

HomeActionCreator.fetchAllData = function(data) {
	AppDispatcher.dispatch({
		type: ActionTypes.FETCH_DATA,
		data: data
	});
};


module.exports = {

	createAccount: function(user) {

		if(user) {
			$.ajax({
			type: "POST",
			url: "/user",
			data: user,
			dataType: "json"
			}).done(function(data){

				if(data.result === 'success') {
					LoginActionCreator.createAccountSuccessful(data.data);
				} else if(data.result === 'failure') {
					alert('User name: ' + data.data + ' already existed.');
				}
			}).fail(function(jqXHR, status){
				alert('Something goes wrong.');
			});
		}
	},

	login: function(credentials) {

		if(credentials) {
			$.ajax({
				type: "POST",
				url: "/userlogin",
				data: credentials,
				dataType: "json"
			}).done(function(data){
				if(data.data) {
					LoginActionCreator.loginSuccessful(data.data);
				} else if(!data.data) {
					alert('Username and / or password incorrect.');
				}
			}).fail(function(jqXHR, status){
				alert('Something goes wrong.');
			});
		}
	},

	fetchAllData: function(data) {
		$.ajax({
			type: "GET",
			url: "/",
			dataType: "json"
		}).done(function(data){
			HomeActionCreator.fetchAllData(data);
		}).fail(function(jqXHR, status){
			console.log('Something goes wrong. ' + status);
		});
	}
};