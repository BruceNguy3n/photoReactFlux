import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import PhotoAPIUtils from '../utils/PhotoAPIUtils';

var ActionTypes = Constants.ActionTypes;

module.exports = {
	goToImagePage: function(image) {
		AppDispatcher.dispatch({
			type: ActionTypes.DISPLAY_IMAGE_PAGE,
			data: image
		});
	},
	goToUploadPage: function() {
		AppDispatcher.dispatch({
			type: ActionTypes.DISPLAY_UPLOAD_PAGE
		})
	},
	getCommentsForImage: function(image) {
		AppDispatcher.dispatch({
			type: ActionTypes.GET_COMMENTS_FOR_IMAGE,
			data: image
		});

		PhotoAPIUtils.getCommentsForImage(image);
	},
	createPhoto: function(data) {
		AppDispatcher.dispatch({
			type: ActionTypes.CREATE_PHOTO,
			data: data
		});

		PhotoAPIUtils.uploadPhoto(data);
	},
	postComment: function(data) {
		AppDispatcher.dispatch({
			type: ActionTypes.POST_COMMENT,
			data: data
		});

		PhotoAPIUtils.postComment(data);
	},
	likePhoto: function(data) {
		AppDispatcher.dispatch({
			type: ActionTypes.LIKE_PHOTO,
		});

		PhotoAPIUtils.likePhoto(data);
	},
	newCommentAdded: function(data) {
		AppDispatcher.dispatch({
			type: ActionTypes.NEW_COMMENT_ADDED,
			data: data
		});
	}
};