import React from 'react';
import HomeStore from '../../stores/HomeStore';
import AuthStore from '../../stores/AuthStore';
import HeaderSection from './HeaderSection.jsx';
import FooterSection from './FooterSection.jsx';
import BodySection from './BodySection.jsx';
import WebAPIUtils from '../../utils/WebAPIUtils';

function getStateFromStores() {
	return {
		user: AuthStore.getUser()
	};
}

class MainPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = getStateFromStores();
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
	}

	render() {

		return (
			<div>
				<HeaderSection user={this.state.user} />
				<BodySection />
				<FooterSection />
			</div>
		);
	}

	_onChange() {
		this.setState(getStateFromStores());
	}

}

export default MainPage;