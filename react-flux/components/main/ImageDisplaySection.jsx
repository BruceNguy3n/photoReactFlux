import React from 'react';
import HomeStore from '../../stores/HomeStore';
import HomeActionCreator from '../../actions/HomeActionCreator';

var Helpers = require('../../utils/Helpers');

function getStateFromStores(){
	return {
		image: HomeStore.getImage()
	}
}

class ImageDisplaySection extends React.Component {
	constructor(props) {
		super(props);

		this.state = getStateFromStores();
		this._onChange = this._onChange.bind(this);
		this._doLike = this._doLike.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
		HomeStore.removeChangeListener(this._onChange);
	}

	componentWillUnMount() {
		
	}

	render() {

		var path = "/public/upload/" + this.state.image.filename;
		var timestamp = Helpers.timeago(this.state.image.timestamp);

		return (
			
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h2 className="panel-title">{this.state.image.title}</h2>
				</div>
				<div className="panel-body">
					<p>{this.state.image.description}</p>
					<div className="col-md-12" style={{padding: 0 + 'px'}}>
						<img src={path} className="img-responsive" style={{padding: 0 + 'px'}} />
					</div>
				</div>
				<div className="panel-footer">
					<div className="row text-center">
						<div className="col-md-12">
							<button className="btn btn-success" id="btn-like" onClick={this._doLike}><i className="fa fa-heart"> Like</i></button> &nbsp;
							<strong className="likes-count">{this.state.image.likes}</strong> &nbsp; - &nbsp; 
							<i className="fa fa-eye"></i>&nbsp;<strong>{this.state.image.views}</strong> 
							&nbsp;-&nbsp;<button className="btn btn-danger" id="btn-delete" data-id="{this.state.image.uniqueId}"><i className="fa fa-times"></i></button>
						</div> 
					</div>
					<hr />
					<div className="row">
					<div className="col-md-12 text-center">
						Posted: <em className="text-muted">{timestamp}</em>
					</div>
				</div>
				</div>
			</div>	
		);
	}

	_doLike(event) {
		HomeActionCreator.likePhoto({filename: this.state.image.filename});
	}

	_onChange(){
		this.setState(getStateFromStores());
	}
}

ImageDisplaySection.propTypes = {image: React.PropTypes.object};

export default ImageDisplaySection;