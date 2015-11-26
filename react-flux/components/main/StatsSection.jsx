import React from 'react';


class StatsSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {stats: props.stats};
	}

	componentDidMount() {
		
	}

	componentWillUnMount() {
		
	}

	render() {

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">
						<b>Stats</b>
					</h3>
				</div>
				<div className="panel-body">
					<div className="row">
						<div className="col-md-2 col-sm-4 text-left">Images:</div>
						<div className="col-md-10 col-sm-8 text-right">{this.state.stats.images}</div>
					</div>
					<div className="row">
						<div className="col-md-2 col-sm-4 text-left">Comments:</div>
						<div className="col-md-10 col-sm-8 text-right">{this.state.stats.comments}</div>
					</div>
					<div className="row">
						<div className="col-md-2 col-sm-4 text-left">Views:</div>
						<div className="col-md-10 col-sm-8 text-right">{this.state.stats.views}</div>
					</div>
					<div className="row">
						<div className="col-md-2 col-sm-4 text-left">Likes:</div>
						<div className="col-md-10 col-sm-8 text-right">{this.state.stats.likes}</div>
					</div>
				</div>
			</div>
		);
	}
}

StatsSection.propTypes = {stats: React.PropTypes.object};
export default StatsSection;