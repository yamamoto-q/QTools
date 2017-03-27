'use strict';

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');

var ToDo = require('./ToDo.js');

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
		var viewBody = React.createElement(Todo, null);
		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon }),
			viewBody,
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
