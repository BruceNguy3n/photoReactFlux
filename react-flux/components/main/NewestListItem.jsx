import React from 'react';
import HomeActionCreator from '../../actions/HomeActionCreator';


class NewestListItem extends React.Component {
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
		var inlineStyle = {width: 85 + 'px', height: 85 + 'px'};

		var path = "/public/upload/" + this.state.image.filename;

		return (
			<div className="col-md-3 col-ms-4 col-xs-4 text-center newstListItem">
				<a onClick={this._onClick}><img src={path} 
					alt={this.state.image.title} className="img-thumbnail img-responsive" 
					style={inlineStyle} /></a>
			</div>
		);
	}

	_onClick(event) {
		HomeActionCreator.goToImagePage(this.state.image);
		HomeActionCreator.getCommentsForImage(this.state.image);
	}
}

NewestListItem.propTypes = {images: React.PropTypes.object};
export default NewestListItem;