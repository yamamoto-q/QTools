var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	getInitialState: function() {
		var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
		return {
			allocatedWorkitems:allocatedWorkitems,
			offeredWorkitems:offeredWorkitems
		};
	},
	componentDidMount: function() {
		var self = this;
		/*
		Ctr_QApi.Store.addChangeAllocatedWorkitemsListener(function(){
			if (self.isMounted()) {
				var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
				self.setState({
					allocatedWorkitems:allocatedWorkitems
				});
				
			}
		});

		Ctr_QApi.Store.addChangeOfferedWorkitemsListener(function(){
			if (self.isMounted()) {
				var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
				self.setState({
					offeredWorkitems:offeredWorkitems
				});
			}
		});
		*/
		Ctr_QApi.Store.addChangeProcessModelListListener(function(){
			var processModelList = Ctr_QApi.Store.getProcessModelList();
			console.log("processModelList", processModelList);
		});

		Ctr_QApi.Store.addChangeStartableActivitiesListener(function(){
			var startableActivities = Ctr_QApi.Store.getStartableActivities();
			console.log("StartableActivities", startableActivities);
		});

		Ctr_QApi.Action.getStartableActivities();
		Ctr_QApi.Action.getProcessModelList(false);
	},
	onClick:function(e){
		e.preventDefault();
		var viewName = e.currentTarget.getAttribute('data-viewname');
		Controller_View.Action.setView(viewName);
	},
	render: function() {
		return(
			<div className="card" onClick={this.onClick} data-viewname={Controller_View.ViewNames.WORK}>
				<div className="card-block">
					<h4 className="card-title">Apps</h4>
					<p className="card-text">Hoge</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">allocatedWorkitems {this.state.allocatedWorkitems.length}</li>
					<li className="list-group-item">offeredWorkitems {this.state.offeredWorkitems.length}</li>
				</ul>
			</div>
		)
	}
});