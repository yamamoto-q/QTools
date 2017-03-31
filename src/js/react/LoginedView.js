'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

var Home = require('./View_Home.js');
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
			case Controller_View.ViewNames.HOME:
				return React.createElement(Home, null);
				break;
			case Controller_View.ViewNames.ADMIN_TOOLS:
				return React.createElement(AdminTools, null);
				break;
		}
	}
});
