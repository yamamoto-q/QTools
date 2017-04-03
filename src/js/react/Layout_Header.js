'use strict';

var React = require('react');
var Header = require('./Elem_Header.js');
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
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon, label: this.props.label }),
			this.props.children,
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
