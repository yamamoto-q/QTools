'use strict';

var React = require('react');

var LayoutHeader = require('./Layout_Header.js');

var Header = require('./Header.js');
var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');
var ScrollArea = require('./ScrollArea.js');

var TaskSummary = require('./View_Task_Summary.js');

var SettingMenu = require('./SettingMenu.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			LayoutHeader,
			{ label: 'Home' },
			React.createElement(
				'div',
				{ className: 'height-fix' },
				React.createElement(
					Bootstrap_Container,
					{ className: 'height-fix' },
					React.createElement(
						Bootstrap_Row,
						{ className: 'height-fix' },
						React.createElement(
							'div',
							{ className: 'col nav-items nav-items-v hidden-xs-down', style: { flexBasis: "210px", flexGrow: "0" } },
							React.createElement(
								ScrollArea,
								null,
								React.createElement(
									NavItem,
									{ icon: 'home' },
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
						),
						React.createElement(
							'div',
							{ className: 'col' },
							React.createElement(
								ScrollArea,
								null,
								React.createElement(
									'div',
									{ className: 'card-group' },
									React.createElement(TaskSummary, null)
								)
							)
						)
					)
				)
			),
			React.createElement(
				Footer,
				null,
				React.createElement(
					NavItem,
					{ icon: 'home' },
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
