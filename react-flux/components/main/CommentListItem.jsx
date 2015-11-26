import React from 'react';
import HomeActionCreator from '../../actions/HomeActionCreator';

var Helpers = require('../../utils/Helpers');

class CommentListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {comment: props.comment}
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
	}

	render() {

		var timestamp = Helpers.timeago(this.comment.timestamp);
		var path = "/public/upload/" + this.state.comment.image.filename;

		return (	

			<li className="media">
				<a className="pull-left" onClick={this._onClick}>
					<img className="media-object" width="45" height="45" src={path} />
				</a>
				<div className="media-body">
					{this.state.comment.comment}<br />
					<strong className="media-heading">
					{this.state.comment.name}</strong>&nbsp;<small className="text-muted">
					{timestamp}</small>
				</div>
			</li>
					
		);
	}

	_onClick(event) {
		HomeActionCreator.goToImagePage(this.state.comment.image);
		HomeActionCreator.getCommentsForImage(this.state.comment.image);
	}
}

export default CommentListItem;