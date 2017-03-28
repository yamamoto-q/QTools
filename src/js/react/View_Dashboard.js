'use strict';

var React = require('react');
var Header = require('./Header.js');
var Footer = require('./Footer.js');
var FooterItem = require('./FooterItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var SettingMenu = require('./SettingMenu.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {
		$("#sideMenu #sideMenu-box").css("left", "-300px");
		$("#sideMenu.sideMenu-modal").css("opacity", "0").show().animate({
			opacity: 1
		}, 250, function () {
			$("#sideMenu #sideMenu-box").animate({
				left: "0"
			}, 250, function () {
				/* stuff to do after animation is complete */
			});
		});
	},
	hideSideMenu: function hideSideMenu(e) {
		e.preventDefault();
		$("#sideMenu #sideMenu-box").animate({
			left: "-300px"
		}, 250, function () {
			$("#sideMenu.sideMenu-modal").animate({
				opacity: "0"
			}, 250, function () {
				$("#sideMenu.sideMenu-modal").css('display', 'none');
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
							Bootstrap_Col,
							null,
							'Dashboard'
						)
					)
				)
			),
			React.createElement(
				Footer,
				null,
				React.createElement(
					FooterItem,
					null,
					'A'
				),
				React.createElement(
					FooterItem,
					null,
					'B'
				),
				React.createElement(
					FooterItem,
					null,
					'C'
				)
			),
			React.createElement(
				'div',
				{ id: 'sideMenu', className: 'sideMenu-modal sideMenu-modal-hide', onClick: this.hideSideMenu },
				React.createElement(
					'div',
					{ id: 'sideMenu-box', style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", bottom: "0" } },
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
