import React from 'react';
import PopularListItem from './PopularListItem.jsx';

function getPopularListItem(image) {
	return (
		<PopularListItem key={image._id} image={image} />
	);
}

class PopularSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {images: props.popular};
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
	}

	render() {

		var popularListItems = this.state.images.map(getPopularListItem);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">
						<b>Most Popular</b>
					</h3>
				</div>
				<div className="panel-body">
					{popularListItems}
				</div>
			</div>
		);
	}
}

PopularSection.propTypes = {popular: React.PropTypes.array};
export default PopularSection;