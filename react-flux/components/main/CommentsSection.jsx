import React from 'react';
import CommentListItem from './CommentListItem.jsx';
import HomeStore from '../../stores/HomeStore';

function getCommentListItem(comment) {
	return (
		<CommentListItem key={comment._id} comment={comment} />
	);
}

class CommentsSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {comments: props.comments}
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
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

	_onChange(){
		this.setState({comments: this.props.comments});
	}
}

CommentsSection.propTypes = {image: React.PropTypes.object};
export default CommentsSection;