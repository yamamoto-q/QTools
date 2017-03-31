'use strict';

var React = require('react');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var TaskSummary = require('./View_Task_Summary.js');

module.exports = React.createClass({
	displayName: 'exports',

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
						{ icon: 'inbox' },
						'B'
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
					{ icon: 'inbox' },
					'B'
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
