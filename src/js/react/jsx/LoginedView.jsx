var React = require('react');
var Controller_View = require('./Controller_View.js');

var vHome = require('./View_Home.js');
var vAdminTools = require('./View_AdminTools.js');
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
			case Controller_View.ViewNames.HOME:
				viewBody = (<vHome />);
				break;
			case Controller_View.ViewNames.ADMIN_TOOLS:
				viewBody = (<vAdminTools />);
				break;
		} 
		return (
			<div className="height-fix">
				{viewBody}
			</div>
		);
	}
});

