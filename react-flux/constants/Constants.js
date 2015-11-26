import keyMirror from 'keymirror';

module.exports = {
	ActionTypes: keyMirror({
		CLICK_PHOTO: null,
		CREATE_PHOTO: null,
		CREATE_ACCOUNT: null,
		LOG_IN: null,
		LOG_OUT: null,
		LOGIN_SUCCESS: null,
		DISPLAY_LOGIN_FORM: null,
		DISPLAY_CREATE_ACCOUNT_FORM: null,
		ACCOUNT_CREATED: null,
		FETCH_DATA: null,
		DISPLAY_UPLOAD_PAGE: null,
		DISPLAY_IMAGE_PAGE: null,
		COMMENT_RECEIVE: null,
		POST_COMMENT: null,
		LIKE_PHOTO: null
	})
};