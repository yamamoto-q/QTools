'use strict';

var React = require('react');
var Header = require('./Header.js');
var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var SettingMenu = require('./SettingMenu.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {
		$("#SettingMenu #SettingMenu-box").css("left", "-300px");
		$("#SettingMenu.SettingMenu-modal").css("opacity", "0").show().animate({
			opacity: 1
		}, 250, function () {
			$("#SettingMenu #SettingMenu-box").animate({
				left: "0"
			}, 250, function () {
				/* stuff to do after animation is complete */
			});
		});
	},
	hideSettingMenu: function hideSettingMenu(e) {
		e.preventDefault();
		$("#SettingMenu #SettingMenu-box").animate({
			left: "-300px"
		}, 250, function () {
			$("#SettingMenu.SettingMenu-modal").animate({
				opacity: "0"
			}, 250, function () {
				$("#SettingMenu.SettingMenu-modal").css('display', 'none');
			});
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon }),
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
								null,
								'A'
							),
							React.createElement(
								NavItem,
								null,
								'B'
							),
							React.createElement(
								NavItem,
								null,
								'C'
							)
						),
						React.createElement(
							'div',
							{ className: 'col' },
							'main'
						)
					)
				)
			),
			React.createElement(
				Footer,
				null,
				React.createElement(
					NavItem,
					null,
					'A'
				),
				React.createElement(
					NavItem,
					null,
					'B'
				),
				React.createElement(
					NavItem,
					null,
					'C'
				)
			),
			React.createElement(
				'div',
				{ id: 'SettingMenu', className: 'SettingMenu-modal SettingMenu-modal-hide', onClick: this.hideSettingMenu },
				React.createElement(
					'div',
					{ id: 'SettingMenu-box', style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", bottom: "0" } },
					React.createElement(SettingMenu, null),
					React.createElement(
						'div',
						null,
						BuildInfo.VERSION
					)
				)
			)
		);
	}
});
