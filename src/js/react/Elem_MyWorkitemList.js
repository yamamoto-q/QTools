'use strict';

var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var workitems = Ctr_QApi.Store.getWorkitems();
		return {
			workitems: workitems
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;

		Ctr_QApi.Store.addChangeWorkitemsListener(function () {
			if (self.isMounted()) {
				var workitems = Ctr_QApi.Store.getWorkitems();
				self.setState({
					workitems: workitems
				});
			}
		});

		Ctr_QApi.Action.startCheckWorkItems();
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
