import React from 'react';
import LoginActionCreator from '../../actions/LoginActionCreator';
import AuthStore from '../../stores/AuthStore';
import WebAPIUtils from '../../utils/WebAPIUtils';

var md5 = require('MD5');

class SignIn extends React.Component {

	constructor(props) {
		super(props);

		this._onClick = this._onClick.bind(this);
		this._usernameChange = this._usernameChange.bind(this);
		this._passwordChange = this._passwordChange.bind(this);
		this._login = this._login.bind(this);

		this.state = {username: '', password: ''};
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
			    		<h3 className="panel-title"><b>Please sign in</b></h3>
			 			</div>
			 			<div className="panel-body">
				    		<form role="form" onSubmit={this._onSubmit}>
				    			<div className="row">
				    				<div className="col-xs-12 col-sm-12 col-md-12">
				    					<div className="form-group">
				                            <input type="text" name="first_name" id="first_name" className="form-control input-sm" 
				                            	placeholder="Username" onChange={this._usernameChange} required
				                            	value={this.state.username} />
				    					</div>
				    				</div>
				    			</div>

				    			<div className="form-group">
				    				<input type="password" name="password" id="password" className="form-control input-sm" 
				    					placeholder="Password" onChange={this._passwordChange} required
				    					value={this.state.password} />
				    			</div>
					    			
				    			<input type="submit" value="Log In" className="btn btn-info btn-block"
				    				onClick={this._login} />
					    		
				    		</form>
				    		<br />
				    		<a onClick={this._onClick}>Create a new account</a>
				    	</div>
		    		</div>
	    		</div>
	    	</div>
	   	 </div>
		);
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

	_login(event) {
		event.preventDefault();
		var username = this.state.username.trim();
		var password = this.state.password;

		if(!username || !password) {
			alert("Please enter your username and password.");
			return;
		}

		LoginActionCreator.login({username: username, password: md5(password)});
	}

	_onClick(event) {
		event.preventDefault();
		LoginActionCreator.displayCreateAccountForm();
	}
}

export default SignIn;