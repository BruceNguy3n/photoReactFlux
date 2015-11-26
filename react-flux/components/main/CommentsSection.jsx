import React from 'react';
import CommentListItem from './CommentListItem.jsx';

function getCommentListItem(comment) {
	return (
		<CommentListItem key={comment._id} comment={comment} />
	);
}

class PopularSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {comments: props.comments}
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
	}

	render() {

		var commentListItems = this.state.comments.map(getCommentListItem);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
				<h3 className="panel-title">
					<b>Latest Comments</b>
				</h3>
			</div>
			<div className="panel-body">
				<ul className="media-list">
					{commentListItems}
				</ul>
			</div>
			</div>
		);
	}
}

PopularSection.propTypes = {image: React.PropTypes.object};
export default PopularSection;