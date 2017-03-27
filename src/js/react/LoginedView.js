'use strict';

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {

		$("#sideMenu.sideMenu-modal").css({
			display: 'box',
			opacity: 0
		}).animate({
			opacity: 1
		}, 500, function () {
			$("#sideMenu #sideMenu-modal-box").animate({
				left: 0
			}, 500, function () {
				/* stuff to do after animation is complete */
			});
		});
	},
	hideSideMenu: function hideSideMenu() {
		$("#sideMenu #sideMenu-modal-box").animate({
			left: "-300px"
		}, 500, function () {
			$("#sideMenu.sideMenu-modal").animate({
				opacity: 0
			}, 500, function () {
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
				'pre',
				null,
				'Logined'
			),
			React.createElement(
				'div',
				{ id: 'sideMenu', className: 'sideMenu-modal sideMenu-modal-hide', onClick: this.hideSideMenu },
				React.createElement(
					'div',
					{ id: 'sideMenu-modal-box', style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", left: "0", bottom: "0" } },
					'hoge 35:',
					JSON.stringify(this.state, null, 2),
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
