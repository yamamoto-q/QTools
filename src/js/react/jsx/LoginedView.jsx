var React = require('react');
var Controller_View = require('./Controller_View.js');

var Home = require('./View_Home.js');
var Work = require('./View_Work.js');
var Apps = require('./View_Apps.js');
var AdminTools = require('./View_AdminTools.js');

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
				return(<Home />);
				break;

			case Controller_View.ViewNames.WORK:
				return(<Work />);
				break;

			case Controller_View.ViewNames.APPS:
				return(<Apps />);
				break;

			case Controller_View.ViewNames.ADMIN_TOOLS:
				return(<AdminTools />);
				break;
		}
	}
});

