import React from 'react';
import HomeActionCreator from '../../actions/HomeActionCreator';
import HomeStore from '../../stores/HomeStore';

var Helpers = require('../../utils/Helpers');

class CommentListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {comment: props.comment}
		this._onClick = this._onClick.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
	}

	render() {

		var timestamp = Helpers.timeago(this.state.comment.timestamp);
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

	_onChange(){
		this.setState({comment: this.props.comment});
	}
}

export default CommentListItem;