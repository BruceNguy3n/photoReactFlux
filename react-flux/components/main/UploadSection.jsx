import React from 'react';
import AuthStore from '../../stores/AuthStore';
import HomeActionCreator from '../../actions/HomeActionCreator';

function getStateFromStores() {
	return {
		user: AuthStore.getUser()
	};
}

class UploadSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = getStateFromStores();
		this._onChange = this._onChange.bind(this);
		this._fileChange = this._fileChange.bind(this);
		this._titleChange = this._titleChange.bind(this);
		this._descriptionChange = this._descriptionChange.bind(this);
		this._uploadImage = this._uploadImage.bind(this);
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	render() {

		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">
						Upload an Image
					</h3>
				</div>
				<form role="form" onSubmit={this._onSubmit}>
					<div className="panel-body form-horizontal">
						<div className="form-group col-md-12">
							<label className="col-md-2 control-label" htmlFor="file">Browse:</label>
							<div className="col-md-10">
								<input className="form-control" type="file" id="file" name="file" 
								  onChange={this._fileChange} required />
							</div>
						</div>
						<div className="form-group col-md-12">
							<label className="col-md-2 control-label" htmlFor="title">Title:</label>
							<div className="col-md-10">
								<input className="form-control" type="text" name="title" 
									value={this.state.title} onChange={this._titleChange} required />
							</div>
						</div>
						<div className="form-group col-md-12">
							<label className="col-md-2 control-label" htmlFor="description">Description:</label>
							<div className="col-md-10">
								<textarea className="form-control" name="description" rows="2"
									value={this.state.description} onChange={this._descriptionChange} required></textarea>
							</div>
						</div>
						<div className="form-group col-md-12">
							<div className="col-md-12 text-right">
								<button type="submit" id="login-btn" className="btn btn-success" onClick={this._uploadImage}
									type="button"><i className="fa fa-cloud-upload"></i>
									Upload Image
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}

	_onSubmit(event) {
		event.preventDefault();
	}

	_fileChange(event, value) {
		this.setState({file: event.target.files});
	}

	_titleChange(event, value) {
		this.setState({title: event.target.value});
	}

	_descriptionChange(event, value) {
		this.setState({description: event.target.value});
	}

	_uploadImage(event) {
		var uid = this.state.user._id;
		var f = this.state.file;
		var t = this.state.title;
		var d = this.state.description;
		var data = {file: f, title: t, description: d, user_id: uid};

		if(!uid || !f || !t || !d) {
			alert('Please fill in the required fields');
			return;
		}

		var data = new FormData();
		data.append('file', f[0]);
		data.append('title', t);
		data.append('description', d);
		data.append('user_id', uid);

		HomeActionCreator.createPhoto(data);
	}

	_onChange() {
		this.setState(getStateFromStores());
	}
}

export default UploadSection;