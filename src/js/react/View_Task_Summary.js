'use strict';

var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');

module.exports = React.createClass({
	displayName: 'exports',

	componentDidMount: function componentDidMount() {
		var self = this;
		/*
  Controller_View.Store.addChangeViewListener(function () {
  	if (self.isMounted()) {
  		var viewName = Controller_View.Store.getViewNane();
  		self.setState({
  			viewName:viewName
  		});
  	};
  });
  */
		_QApi.Action.getAllocatedTasks();
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'card' },
			React.createElement(
				'div',
				{ className: 'card-block' },
				React.createElement(
					'h4',
					{ className: 'card-title' },
					'View_Task_Summar'
				),
				React.createElement(
					'p',
					{ className: 'card-text' },
					'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
				),
				React.createElement(
					'a',
					{ href: '#', className: 'btn btn-primary' },
					'Go somewhere'
				)
			)
		);
	}
});
