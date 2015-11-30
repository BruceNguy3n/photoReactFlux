import React from 'react';
import CommentImgListItem from './CommentImgListItem.jsx';
import HomeStore from '../../stores/HomeStore';
import AuthStore from '../../stores/AuthStore';
import HomeActionCreator from '../../actions/HomeActionCreator';

var $ = require('jQuery');

function getCommentImgListItem(comment) {
	return (
		<CommentImgListItem key={comment._id} comment={comment} />
	);
}

function getStateFromStores(){
	return {
		comments: HomeStore.getComments(),
		user: AuthStore.getUser(),
		image: HomeStore.getImage()
	};
}

class PostCommentSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = getStateFromStores();
		this._commentChange = this._commentChange.bind(this);
		this._postComment = this._postComment.bind(this);
		this._onChange = this._onChange.bind(this);
		this.postCommentAndReload = this.postCommentAndReload.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
	}

	render() {

		var commentListItems;

		if(!this.state.comments) {
			commentListItems = [];
		} else {
			commentListItems = this.state.comments.map(getCommentImgListItem);
		}

		return (
			
				<div className="panel panel-default">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-6">
								<strong className="panel-title">Comments</strong>
							</div>
							<div className="col-xs-6 text-right">
								<button className="btn btn-default btn-sm" id="btn-comment"><i className="fa fa-comments-o">
										Post Comment...</i>
								</button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<blockquote id="post-comment">
							<div className="row">
								<form role="form" onSubmit={this._onSubmit}>
									<div className="form-group col-sm-12">
										<label className="col-sm-3 control-label" htmlFor="comment">Comment:
										</label>
										<div className="col-sm-9">
											<textarea className="form-control" name="comment" rows="4" value={this.state.comment}
												onChange={this._commentChange} required></textarea>
										</div>
									</div>
									<div className="form-group col-sm-12">
										<div className="col-sm-12 text-right">
											<button type="submit" id="comment-btn" className="btn btn-success" onClick={this._postComment}
												type="button"><i className="fa fa-comment"></i>Post</button>
										</div>
									</div>
								</form>
							</div>
						</blockquote>
						<ul className="media-list">
							{commentListItems}
						</ul>
					</div>
				</div>
		);
	}

	_onSubmit(event){
		event.preventDefault();
	}

	_commentChange(event) {
		this.setState({comment: event.target.value});
	}

	reloadComments() {
		$.ajax({
			type: "GET",
			url: "/image/" + this.state.image.filename,
			dataType: "json"
		}).done(function(data){
			HomeActionCreator.newCommentAdded(data);
		}.bind(this)).fail(function(jqXHR, status){
			console.log('Something goes wrong. ' + status);
		});
	}

	postCommentAndReload(data) {
		$.ajax({
			type: "POST",
			url: "/image/comment",
			dataType: "json",
			data: data
			}).done(function(data){
				this.reloadComments();
			}.bind(this)).fail(function(jqXHR, status){
				console.log('Something goes wrong. ' + status);
			});
	}

	_postComment(event) {
		console.log('Posting');
		if(!this.state.comment) {
			alert('Please provide a comment.');
			return;
		}

		this.postCommentAndReload({comment: this.state.comment,
			 username: this.state.user.userName,
			 imagename: this.state.image.filename});

		this.setState({comment: ''});

		/*HomeActionCreator.postComment(
			{comment: this.state.comment,
			 username: this.state.user.userName,
			 imagename: this.state.image.filename});*/
	}

	_onChange() {
		this.setState(getStateFromStores());
	}
}

export default PostCommentSection;