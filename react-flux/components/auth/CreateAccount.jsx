import React from 'react';
import LoginActionCreator from '../../actions/LoginActionCreator';
import AuthStore from '../../stores/AuthStore';
var md5 = require('MD5');

class CreateAccount extends React.Component {

	constructor(props) {
		super(props);

		this._onClick = this._onClick.bind(this);
		this._usernameChange = this._usernameChange.bind(this);
		this._passwordChange = this._passwordChange.bind(this);
		this._pwdConfirmationChange = this._pwdConfirmationChange.bind(this);
		this._createAccount = this._createAccount.bind(this);

		this.state = {username: '', password: '', password_confirmation: ''};
	}

	componentDidMount() {
	}

	componentWillUnMount() {
	}

	render() {

		return (

			<div className="container">
	        <div className="row centered-form">
	        <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
	        	<div className="panel panel-default">
	        		<div className="panel-heading">
			    		<h3 className="panel-title"><b>Create your account</b></h3>
			 			</div>
			 			<div className="panel-body">
				    		<form role="form" onSubmit={this._onSubmit}>
				    			<div className="row">
				    				<div className="col-xs-12 col-sm-12 col-md-12">
				    					<div className="form-group">
				                            <input type="text" name="username" id="username" className="form-control input-sm" 
				                            	placeholder="Username" value={this.state.username} onChange={this._usernameChange} required />
				    					</div>
				    				</div>
				    			</div>

				    			<div className="row">
				    				<div className="col-xs-6 col-sm-6 col-md-6">
				    					<div className="form-group">
				    						<input type="password" name="password" id="password" className="form-control input-sm" 
				    							placeholder="Password" onChange={this._passwordChange} value={this.state.password} required />
				    					</div>
				    				</div>
				    				<div className="col-xs-6 col-sm-6 col-md-6">
				    					<div className="form-group">
				    						<input type="password" name="password_confirmation" id="password_confirmation"
				    							 className="form-control input-sm" placeholder="Confirm Password" 
				    							 value={this.state.password_confirmation} onChange={this._pwdConfirmationChange} required />
				    					</div>
				    				</div>
				    			</div>
					    			
				    			<input type="submit" value="Register" className="btn btn-info btn-block" onClick={this._createAccount} />
					    		<br />
					    		<a onClick={this._onClick}>Back to login</a>
				    		</form>
				    	</div>
		    		</div>
	    		</div>
	    	</div>
	   	 </div>
		);
	}

	_onClick() {
		LoginActionCreator.displayLoginForm();
	}

	_onSubmit(event) {
		event.preventDefault();
	}

	_usernameChange(event, value) {
		this.setState({username: event.target.value});
	}

	_passwordChange(event, value) {
		this.setState({password: event.target.value});
	}

	_pwdConfirmationChange(event, value) {
		this.setState({password_confirmation: event.target.value});
	}

	_createAccount(event, value) {
		
		var username = this.state.username.trim();
		var password = this.state.password;
		var pwdConfirmation = this.state.password_confirmation;

		if(!username || !password || !pwdConfirmation) {
			return;
		}

		if(password !== pwdConfirmation) {
			alert('Password mismatch. Please try again.');
			return;
		}

		var user = {username: username, password: md5(password)};
		LoginActionCreator.createAccount(user);
	}
}

export default CreateAccount;