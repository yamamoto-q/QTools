'use strict';

var React = require('react');
var Header = require('./Header.js');
var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var TaskSummary = require('./View_Task_Summary.js');

var SettingMenu = require('./SettingMenu.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {
		$("#SettingMenu #SettingMenu-box").css("left", "-300px");
		$("#SettingMenu.SettingMenu-modal").css("opacity", "0").show().animate({
			opacity: 1
		}, 125, function () {
			$("#SettingMenu #SettingMenu-box").animate({
				left: "0"
			}, 125, function () {
				/* stuff to do after animation is complete */
			});
		});
	},
	hideSettingMenu: function hideSettingMenu(e) {
		e.preventDefault();
		$("#SettingMenu #SettingMenu-box").animate({
			left: "-300px"
		}, 125, function () {
			$("#SettingMenu.SettingMenu-modal").animate({
				opacity: "0"
			}, 125, function () {
				$("#SettingMenu.SettingMenu-modal").css('display', 'none');
			});
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon, label: 'Home' }),
			React.createElement(
				'div',
				{ className: 'height-fix' },
				React.createElement(
					Bootstrap_Container,
					null,
					React.createElement(
						Bootstrap_Row,
						null,
						React.createElement(
							'div',
							{ className: 'col nav-items nav-items-v hidden-xs-down', style: { flexBasis: "210px", flexGrow: "0" } },
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
						),
						React.createElement(
							'div',
							{ className: 'col' },
							React.createElement(
								'div',
								{ className: 'card-group' },
								React.createElement(TaskSummary, null),
								React.createElement(TaskSummary, null),
								React.createElement(TaskSummary, null)
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
			),
			React.createElement(
				'div',
				{ id: 'SettingMenu', className: 'SettingMenu-modal SettingMenu-modal-hide', onClick: this.hideSettingMenu },
				React.createElement(
					'div',
					{ id: 'SettingMenu-box', style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", bottom: "0" } },
					React.createElement(
						'div',
						{ className: 'scroll-v' },
						React.createElement(SettingMenu, null),
						React.createElement(
							'div',
							null,
							BuildInfo.VERSION
						)
					)
				)
			)
		);
	}
});
