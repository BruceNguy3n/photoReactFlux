import React from 'react';
import NewestListItem from './NewestListItem.jsx';

function getNewestListItem(image) {
	return (
		<NewestListItem key={image._id} image={image} />
	);
}

class NewestSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {images: props.images};
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
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
}

NewestSection.propTypes = {images: React.PropTypes.array};
export default NewestSection;