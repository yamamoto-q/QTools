'use strict';

var React = require('react');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
		var workitems = allocatedWorkitems.concat(offeredWorkitems);
		return {
			allocatedWorkitems: allocatedWorkitems,
			offeredWorkitems: offeredWorkitems,
			workitems: workitems
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;

		_QApi.Store.addChangeAllocatedWorkitemsListener(function () {
			if (self.isMounted()) {
				var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
				var workitems = allocatedWorkitems.concat(self.state.offeredWorkitems);
				self.setState({
					allocatedWorkitems: allocatedWorkitems,
					workitems: workitems
				});
			}
		});

		_QApi.Store.addChangeOfferedWorkitemsListener(function () {
			if (self.isMounted()) {
				var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
				var workitems = self.state.offeredWorkitems.concat(offeredWorkitems);
				self.setState({
					offeredWorkitems: offeredWorkitems,
					workitems: workitems
				});
			}
		});

		_QApi.Action.getAllocatedWorkitems();
		_QApi.Action.getOfferedWorkitems();
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
