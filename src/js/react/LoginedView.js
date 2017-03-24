'use strict';

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {
		$("#sideMenu.sideMenu-modal").addClass("sideMenu-modal-show").removeClass("sideMenu-modal-hide");
	},

	render: function render() {
		var modalClasses = ["sideMenu-modal"];
		if (this.state.sidemenuIsVisible) {
			modalClasses.push("sideMenu-modal-show");
		} else {
			modalClasses.push("sideMenu-modal-hide");
		}

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
				{ id: 'sideMenu', className: 'sideMenu-modal sideMenu-modal-hide' },
				React.createElement(
					'div',
					{ style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", left: "0", bottom: "0" } },
					'hoge 35:',
					JSON.stringify(this.state, null, 2),
					BuildInfo.VERSION
				)
			)
		);
	}
});
