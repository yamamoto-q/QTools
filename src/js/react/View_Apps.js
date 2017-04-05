'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var MyWorkitemList = require('./Elem_MyWorkitemList.js');

module.exports = React.createClass({
	displayName: 'exports',

	componentDidMount: function componentDidMount() {
		$("body").addClass('view-' + Controller_View.ViewNames.APPS);
	},
	componentWillUnmount: function componentWillUnmount() {
		$("body").removeClass('view-' + Controller_View.ViewNames.APPS);
	},
	render: function render() {
		return React.createElement(
			LayoutHeader,
			{ label: 'Apps' },
			React.createElement(
				LayoutBody,
				null,
				React.createElement(
					LayoutBodyLeft,
					null,
					React.createElement(
						NavItem,
						{ icon: 'home', view_name: Controller_View.ViewNames.HOME },
						'Home'
					),
					React.createElement(
						NavItem,
						{ icon: 'inbox', view_name: Controller_View.ViewNames.WORK },
						'Work'
					),
					React.createElement(
						NavItem,
						{ icon: 'games', active: true },
						'Apps'
					)
				),
				React.createElement(
					LayoutBodyRight,
					null,
					React.createElement(
						'ul',
						{ 'class': 'nav nav-tabs', role: 'tablist' },
						React.createElement(
							'li',
							{ 'class': 'nav-item' },
							React.createElement(
								'a',
								{ 'class': 'nav-link active', 'data-toggle': 'tab', href: '#home', role: 'tab' },
								'Home'
							)
						),
						React.createElement(
							'li',
							{ 'class': 'nav-item' },
							React.createElement(
								'a',
								{ 'class': 'nav-link', 'data-toggle': 'tab', href: '#profile', role: 'tab' },
								'Profile'
							)
						),
						React.createElement(
							'li',
							{ 'class': 'nav-item' },
							React.createElement(
								'a',
								{ 'class': 'nav-link', 'data-toggle': 'tab', href: '#messages', role: 'tab' },
								'Messages'
							)
						),
						React.createElement(
							'li',
							{ 'class': 'nav-item' },
							React.createElement(
								'a',
								{ 'class': 'nav-link', 'data-toggle': 'tab', href: '#settings', role: 'tab' },
								'Settings'
							)
						)
					),
					React.createElement(
						'div',
						{ 'class': 'tab-content' },
						React.createElement(
							'div',
							{ 'class': 'tab-pane active', id: 'home', role: 'tabpanel' },
							'...'
						),
						React.createElement(
							'div',
							{ 'class': 'tab-pane', id: 'profile', role: 'tabpanel' },
							'...'
						),
						React.createElement(
							'div',
							{ 'class': 'tab-pane', id: 'messages', role: 'tabpanel' },
							'...'
						),
						React.createElement(
							'div',
							{ 'class': 'tab-pane', id: 'settings', role: 'tabpanel' },
							'...'
						)
					)
				)
			),
			React.createElement(
				Footer,
				null,
				React.createElement(
					NavItem,
					{ icon: 'home', view_name: Controller_View.ViewNames.HOME },
					'Home'
				),
				React.createElement(
					NavItem,
					{ icon: 'inbox', view_name: Controller_View.ViewNames.WORK },
					'Work'
				),
				React.createElement(
					NavItem,
					{ icon: 'games', active: true },
					'Apps'
				)
			)
		);
	}
});
