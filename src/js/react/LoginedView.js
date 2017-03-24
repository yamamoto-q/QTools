'use strict';

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {
		$("#sideMenu.sideMenu-modal").show(); //.addClass("sideMenu-modal-show").removeClass("sideMenu-modal-hide");
	},
	hideSideMenu: function hideSideMenu() {
		$("#sideMenu.sideMenu-modal").hide(); //removeClass("sideMenu-modal-show").addClass("sideMenu-modal-hide");
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
					{ style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", left: "0", bottom: "0" } },
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
