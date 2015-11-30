import React from 'react';
import PopularListItem from './PopularListItem.jsx';
import HomeStore from '../../stores/HomeStore';

function getPopularListItem(image) {
	return (
		<PopularListItem key={image._id} image={image} />
	);
}

class PopularSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {images: props.popular};
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
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

	_onChange() {
		this.setState({images: this.props.popular});
	}
}

PopularSection.propTypes = {popular: React.PropTypes.array};
export default PopularSection;