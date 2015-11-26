import React from 'react';
import LoginActionCreator from '../../actions/LoginActionCreator';
import HomeActionCreator from '../../actions/HomeActionCreator';
import WebAPIUtils from '../../utils/WebAPIUtils';

class HeaderSection extends React.Component {

	constructor(props) {
		super(props);

		this.state = {user: props.user};
		this._onClick = this._onClick.bind(this);
	}

	componentDidMount() {
	}

	componentWillUnMount() {
	}

	render() {

		return (
			<div>
				<div>
				    <nav role="navigation" className="navbar navbar-default">
				        <div id="navbarCollapse" className="collapse navbar-collapse">
				            <ul className="nav navbar-nav navbar-right">
				                <li><a onClick={this._onClick}>{this.state.user.userName} - logout</a></li>
				            </ul>
				        </div>
				    </nav>
				</div>

				<div className="page-header">
					<div className="container">
						<div className="col-md-12 col-sm-12 col-xs-12">
							<h1><a onClick={this._goToUpload}>Home Page</a></h1>
						</div>
					</div>
				</div>
			</div>
		);
	}

	_onClick(event) {
		LoginActionCreator.logout();
	}

	_goToUpload() {
		WebAPIUtils.fetchAllData();
		HomeActionCreator.goToUploadPage();
	}
}

HeaderSection.propTypes = {user: React.PropTypes.object};

export default HeaderSection;