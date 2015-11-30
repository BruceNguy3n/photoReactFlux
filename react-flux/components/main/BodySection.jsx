import React from 'react';
import HomeStore from '../../stores/HomeStore';
import UploadSection from './UploadSection.jsx';
import NewestSection from './NewestSection.jsx';
import StatsSection from './StatsSection.jsx';
import CommentsSection from './CommentsSection.jsx';
import PopularSection from './PopularSection.jsx';
import ImageDisplaySection from './ImageDisplaySection.jsx';
import PostCommentSection from './PostCommentSection.jsx';
import HomeActionCreator from '../../actions/HomeActionCreator';

var $ = require('jQuery');

function getStateFromStores(){

	return {
		pageName: HomeStore.getPageName(),
		data: HomeStore.getAllData()
	}
}

class BodySection extends React.Component {
	constructor(props) {
		super(props);

		this.state  = getStateFromStores();
		this._onChange = this._onChange.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	loadData(){
		$.ajax({
				type: "GET",
				url: "/",
				dataType: "json"
			}).done(function(data){
				HomeActionCreator.fetchAllData(data);
			}.bind(this)).fail(function(jqXHR, status){
				console.log('Something goes wrong. ' + status);
			});
	}

	componentDidMount() {
		setInterval(this.loadData, 5000);
		HomeStore.addChangeListener(this._onChange);
	}

	componentWillUnMount() {
		HomeStore.removeChangeListener(this._onChange);
	}

	render() {

		if(this.state.pageName === 'uploadPage') {
			return (
				<div className="container">
					<div className="row">
						<div className="col-sm-8">
							<UploadSection />
							<NewestSection images={this.state.data.images} />
						</div>
						<div className="col-sm-4">
							<StatsSection stats={this.state.data.sidebar.stats} />
							<PopularSection popular={this.state.data.sidebar.popular} />
							<CommentsSection comments={this.state.data.sidebar.comments} />
						</div>
					</div>
				</div>
			);
		} else if(this.state.pageName === 'imagePage') {
			return (
				<div className="container">
					<div className="row">
						<div className="col-sm-8">
							<ImageDisplaySection />
							<PostCommentSection />
						</div>
						<div className="col-sm-4">
							<StatsSection stats={this.state.data.sidebar.stats} />
							<PopularSection popular={this.state.data.sidebar.popular} />
							<CommentsSection comments={this.state.data.sidebar.comments} />
						</div>
					</div>
				</div>
			);	
		}

		return <div></div>;
	}

	_onChange() {
		this.setState(getStateFromStores());
	}
}

export default BodySection;