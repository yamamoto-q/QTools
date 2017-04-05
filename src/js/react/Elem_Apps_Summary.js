'use strict';

var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
		return {
			allocatedWorkitems: allocatedWorkitems,
			offeredWorkitems: offeredWorkitems
		};
	},
	componentDidMount: function componentDidMount() {
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
  
  Ctr_QApi.Store.addChangeProcessModelListListener(function(){
  	var processModelList = Ctr_QApi.Store.getProcessModelList();
  	console.log("processModelList", processModelList);
  });
  		Ctr_QApi.Store.addChangeStartableActivitiesListener(function(){
  	var startableActivities = Ctr_QApi.Store.getStartableActivities();
  	console.log("StartableActivities", startableActivities);
  });
  */
		Ctr_QApi.Store.addChangeAppsListener(function () {
			var appsIndex = Ctr_QApi.Store.getApps();
			var startable = appsIndex.filter(function (element, index, array) {
				return element.startableActivitis.length > 0;
			});
			console.log("startable", startable);
		});

		Ctr_QApi.Action.getApps();
	},
	onClick: function onClick(e) {
		e.preventDefault();
		var viewName = e.currentTarget.getAttribute('data-viewname');
		Controller_View.Action.setView(viewName);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'card', onClick: this.onClick, 'data-viewname': Controller_View.ViewNames.WORK },
			React.createElement(
				'div',
				{ className: 'card-block' },
				React.createElement(
					'h4',
					{ className: 'card-title' },
					'Apps'
				),
				React.createElement(
					'p',
					{ className: 'card-text' },
					'Hoge'
				)
			),
			React.createElement(
				'ul',
				{ className: 'list-group list-group-flush' },
				React.createElement(
					'li',
					{ className: 'list-group-item' },
					'allocatedWorkitems ',
					this.state.allocatedWorkitems.length
				),
				React.createElement(
					'li',
					{ className: 'list-group-item' },
					'offeredWorkitems ',
					this.state.offeredWorkitems.length
				)
			)
		);
	}
});
