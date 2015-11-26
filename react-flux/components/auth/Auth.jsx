import React from 'react';
import SignIn from './SignIn.jsx';
import CreateAccount from './CreateAccount.jsx';
import AuthStore from '../../stores/AuthStore';

function getStateFromStore() {
	return {
		formName: AuthStore.getFormName()
	};
}

class Auth extends React.Component {
	constructor(props) {
		super(props);

		this._onChange = this._onChange.bind(this);
		this.state = getStateFromStore();
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	render() {

		if(this.state.formName === 'signIn') {
			return <SignIn />;
		} else if(this.state.formName === 'createAccount') {
			return <CreateAccount />;
		}

		return <div></div>;
			
	}

	_onChange() {
		this.setState(getStateFromStore());
	}
}

export default Auth;