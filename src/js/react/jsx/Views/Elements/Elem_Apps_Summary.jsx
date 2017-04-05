var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	getInitialState: function() {
		var appsIndex = Ctr_QApi.Store.getApps();
		var startable = appsIndex.filter(function(element, index, array){
			return element.startableActivitis.length > 0
		});

		return {
			startableApps:startable
		};
	},
	componentDidMount: function() {
		var self = this;
		Ctr_QApi.Store.addChangeAppsListener(function(){
			if (self.isMounted()) {
				var appsIndex = Ctr_QApi.Store.getApps();
				var startable = appsIndex.filter(function(element, index, array){
					return element.startableActivitis.length > 0
				});
				console.log("startable", startable);
				self.setState({
					startableApps:startable
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
		var quickStart = [];
		for (var i = this.state.startableApps.length - 1; i >= 0; i--) {
			var app = this.state.startableApp[i];
			var appName = app.processModelInfoName;
			quickStart.push(
				<li key={"quick-start-" + i} className="list-group-item">{appName}</li>
			);
		}
		return(
			<div className="card" onClick={this.onClick} data-viewname={Controller_View.ViewNames.WORK}>
				<div className="card-block">
					<h4 className="card-title">Apps</h4>
					<p className="card-text">Hoge</p>
				</div>
				<ul className="list-group list-group-flush">
					{quickStart}
				</ul>
			</div>
		)
	}
});