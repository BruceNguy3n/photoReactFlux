import React from 'react';
import HomeActionCreator from '../../actions/HomeActionCreator';

class PopularListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {image: props.image};
		this._onClick = this._onClick.bind(this);
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
	}

	render() {

		var path = "/public/upload/" + this.state.image.filename;
		var inlineStyle = {width: 85 + 'px', height: 85 + 'px'};


		return (
			<div className="col-md-4 col-sm-6 col-xs-4 text-center" 
				style={{paddingBottom: .5 + 'em'}}>
				<a onClick={this._onClick}><img src={path}
				   className="img-thumbnail" style={inlineStyle} /></a>
			</div>
				
		);
	}

	_onClick(event) {
		HomeActionCreator.goToImagePage(this.state.image);
		HomeActionCreator.getCommentsForImage(this.state.image);
	}
}

PopularListItem.propTypes = {image: React.PropTypes.object};
export default PopularListItem;