import React from 'react';
import Auth from './auth/Auth.jsx';
import MainPage from './main/MainPage.jsx';
import AuthStore from '../stores/AuthStore';
import WebAPIUtils from '../utils/WebAPIUtils';

function getStateFromStore() {
	return {
		user: AuthStore.getUser()
	};
}

WebAPIUtils.fetchAllData();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = getStateFromStore();
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		AuthStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		AuthStore.removeChangeListener(this._onChange);
	}

	render() {

		if(this.state.user) {
			return <MainPage user={this.state.user} />;
		} else if(this.state.user === null) {
			return <Auth />;
		}

		return <div></div>;
			
	}

	_onChange() {
		this.setState(getStateFromStore());
	}
}

React.render(<App />, document.getElementById('react'));
