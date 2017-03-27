'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

var Dashboard = require('./View_Dashboard.js');
var AdminTools = require('./View_AdminTools.js');
var ToDo = require('./View_ToDo.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var viewName = Controller_View.Store.getViewNane();
		return {
			viewName: viewName
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;
		Controller_View.Store.addChangeViewListener(function () {
			if (self.isMounted()) {
				var viewName = Controller_View.Store.getViewNane();
				self.setState({
					viewName: viewName
				});
			};
		});
	},
	render: function render() {
		var viewBody;
		switch (this.state.viewName) {
			case Controller_View.ViewNames.DASHBOARD:
				viewBody = React.createElement(Dashboard, null);
				break;
			case Controller_View.ViewNames.ADMIN_TOOLS:
				viewBody = React.createElement(AdminTools, null);
				break;
		}

		return React.createElement(
			'div',
			{ className: 'height-fix' },
			viewBody
		);
	}
});
