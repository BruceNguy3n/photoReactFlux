import React from 'react';

class FooterSection extends React.Component {

	constructor(props) {
		super(props);

	}

	componentDidMount() {
	}

	componentWillUnMount() {
	}

	render() {

		return (

			<div id="footer">
				<hr />
				<div className="container">
					<div className="row">
						<div className="col-sm-12 text-center">
							<p className="text-muted">Demo App With NodeJS - React - Flux - MongoDB</p>
							<p className="text-center">
								<i className="fa fa-twitter-square fa-2x text-primary"></i>
								&nbsp;&nbsp;
								<i className="fa fa-facebook-square fa-2x text-primary"></i>
							</p>
						</div>
					</div>
				</div>
			</div>
		
		);
	}
}


export default FooterSection;