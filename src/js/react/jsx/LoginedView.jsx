var React = require('react');

var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');
var Controller_View = require('./Controller_View.js');

var Dashboard = require('./View_Dashboard.js');
var AdminTools = require('./View_AdminTools.js');
var ToDo = require('./View_ToDo.js');

module.exports = React.createClass({
	getInitialState: function() {
		var viewName = Controller_View.Store.getViewNane();
		return {
			viewName:viewName
		};
	},
	componentDidMount: function() {
		var self = this;
		Controller_View.Store.addChangeViewListener(function () {
			if (self.isMounted()) {
				var viewName = Controller_View.Store.getViewNane();
				self.setState({
					viewName:viewName
				});
			};
		});
	},
	render: function() {
		var viewBody;
		switch (this.state.viewName){
			case Controller_View.ViewNames.DASHBOARD:
				viewBody = (<Dashboard />);
				break;
			case Controller_View.ViewNames.ADMIN_TOOLS:
				viewBody = (<AdminTools />);
				break;
		}

		return (
			<div className="height-fix">
				{viewBody}
			</div>
		);
	}
});

