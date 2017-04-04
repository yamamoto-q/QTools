'use strict';

var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');
var WorkitemListItem = require('./Elem_WorkitemListItem.js');

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
		var listItems = [];
		for (var i = 0; i < this.state.workitems.length; i++) {
			var workitem = this.state.workitems[i];
			var key = "myworkitemlist-" + workitem.processModelInfoId + "-" + workitem.processInstanceId + "-" + workitem.nodeNumber + "-" + workitem.id;

			listItems.push(React.createElement(WorkitemListItem, { key: key, workitem: this.state.workitems[i], list_style: "" }));
		}

		return React.createElement(
			'div',
			{ className: 'scroll-area' },
			React.createElement(ListViewSwitcher, null),
			React.createElement(
				'ul',
				{ className: 'list-group' },
				listItems
			)
		);
	}
});
