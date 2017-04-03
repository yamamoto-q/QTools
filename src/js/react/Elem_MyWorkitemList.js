'use strict';

var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
		var workitems = allocatedWorkitems.concat(offeredWorkitems);
		return {
			allocatedWorkitems: allocatedWorkitems,
			offeredWorkitems: offeredWorkitems,
			workitems: workitems
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;

		Ctr_QApi.Store.addChangeAllocatedWorkitemsListener(function () {
			if (self.isMounted()) {
				var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
				var workitems = allocatedWorkitems.concat(self.state.offeredWorkitems);
				self.setState({
					allocatedWorkitems: allocatedWorkitems,
					workitems: workitems
				});
			}
		});

		Ctr_QApi.Store.addChangeOfferedWorkitemsListener(function () {
			if (self.isMounted()) {
				var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
				var workitems = self.state.offeredWorkitems.concat(offeredWorkitems);
				self.setState({
					offeredWorkitems: offeredWorkitems,
					workitems: workitems
				});
			}
		});

		Ctr_QApi.Action.getAllocatedWorkitems();
		Ctr_QApi.Action.getOfferedWorkitems();
	},
	render: function render() {
		console.log(this.state.workitems);
		return React.createElement(
			'div',
			{ className: 'scroll-area' },
			React.createElement(ListViewSwitcher, null),
			'Elem_MyWorkitemList'
		);
	}
});
