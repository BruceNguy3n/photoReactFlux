import React from 'react';

var Helpers = require('../../utils/Helpers');

class CommentImgListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {comment: props.comment};
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
	}

	render() {

		var timestamp = Helpers.timeago(this.state.comment.timestamp);
		var gravatar = "http://www.gravatar.com/avatar/" + this.state.comment.gravatar + "?d=monsterid&s=45";

		return (
			
			<li className="media">
				<a className="pull-left" href="#">
					<img className="media-object img-circle" 
						src={gravatar} />
				</a>
				<div className="media-body">
					{this.state.comment.comment}
					<br /><strong className="media-heading">{this.state.comment.name}
					</strong>&nbsp;<small className="text-muted">{timestamp}</small>
				</div>
			</li>
						
		);
	}

}

CommentImgListItem.propTypes = {comment: React.PropTypes.object};

export default CommentImgListItem;