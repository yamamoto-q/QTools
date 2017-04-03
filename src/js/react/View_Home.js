'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var TaskSummary = require('./Elem_Task_Summary.js');

module.exports = React.createClass({
	displayName: 'exports',

	componentDidMount: function componentDidMount() {
		$("body").addClass('view-' + Controller_View.ViewNames.HOME);
	},
	componentWillUnmount: function componentWillUnmount() {
		$("body").removeClass('view-' + Controller_View.ViewNames.HOME);
	},
	render: function render() {
		return React.createElement(
			LayoutHeader,
			{ label: 'Home' },
			React.createElement(
				LayoutBody,
				null,
				React.createElement(
					LayoutBodyLeft,
					null,
					React.createElement(
						NavItem,
						{ icon: 'home', active: true },
						'Home'
					),
					React.createElement(
						NavItem,
						{ icon: 'inbox', view_name: Controller_View.ViewNames.WORK },
						'Work'
					),
					React.createElement(
						NavItem,
						{ icon: 'chat_bubble' },
						'C'
					)
				),
				React.createElement(
					LayoutBodyRight,
					null,
					React.createElement(TaskSummary, null)
				)
			),
			React.createElement(
				Footer,
				null,
				React.createElement(
					NavItem,
					{ icon: 'home', active: true },
					'Home'
				),
				React.createElement(
					NavItem,
					{ icon: 'inbox', view_name: Controller_View.ViewNames.WORK },
					'Work'
				),
				React.createElement(
					NavItem,
					{ icon: 'chat_bubble' },
					'C'
				)
			)
		);
	}
});
