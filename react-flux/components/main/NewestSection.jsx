import React from 'react';
import NewestListItem from './NewestListItem.jsx';
import HomeStore from '../../stores/HomeStore';

function getNewestListItem(image) {
	return (
		<NewestListItem key={image._id} image={image} />
	);
}

class NewestSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {images: props.images};
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
	}

	render() {

		var newestListItems = this.state.images.map(getNewestListItem);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
				<h3 className="panel-title">
					<b>Newest Images</b>
				</h3>
			</div>
			<div className="panel-body row">
				{newestListItems}
			</div>
			</div>
		);
	}

	_onChange(){
		this.setState({images: this.props.images});
	}
}

NewestSection.propTypes = {images: React.PropTypes.array};
export default NewestSection;