var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	getInitialState: function() {
		var staredApps = Ctr_QApi.Store.getStaredApps();
		return {
			staredApps:staredApps
		};
	},
	componentDidMount: function() {
		var self = this;
		Ctr_QApi.Store.addChangeAppsListener(function(){
			if (self.isMounted()) {
				var staredApps = Ctr_QApi.Store.getStaredApps();
				self.setState({
					staredApps:staredApps
				});
			}
		});

		Ctr_QApi.Action.getApps();
	},
	onClick:function(e){
		e.preventDefault();
		var viewName = e.currentTarget.getAttribute('data-viewname');
		Controller_View.Action.setView(viewName);
	},
	render: function() {
		var staredApps = [];
		for (var i = this.state.staredApps.length - 1; i >= 0; i--) {
			var staredApp = this.state.staredApps[i];
			console.log("staredApp", staredApp);
			var allocatedNum = staredApp.allocatedWorkitems.length;
			var offeredNum = staredApp.offeredWorkitems.length;
			staredApps.push(
				<li key={"apps-summary-stared-apps-" + staredApp.processModelInfoId} className="list-group-item justify-content-between">
					<span className="icon icon-star"/>
					<span>{staredApp.processModelInfoName}</span>
					<span className="badge badge-default badge-pill">{allocatedNum}/{offeredNum}</span>
				</li>
			);
		}
		return(
			<div className="card" onClick={this.onClick} data-viewname={Controller_View.ViewNames.WORK}>
				<div className="card-block">
					<h4 className="card-title">Apps</h4>
					<p className="card-text">Hoge</p>
				</div>
				<ul className="list-group list-group-flush">
					{staredApps}
				</ul>
			</div>
		)
	}
});