'use strict';

var React = require('react');
var Header = require('./Header.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			sidemenuIsVisible: false
		};
	},
	onClickMenuIcon: function onClickMenuIcon() {
		console.log("onClickMenuIcon");
		this.setState({
			sidemenuIsVisible: true
		});
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
				{ id: 'sideMenu', className: modalClasses.join(" ") },
				React.createElement(
					'div',
					{ style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", left: "0", bottom: "0" } },
					'hoge 35:',
					JSON.stringify(this.state, null, 2)
				)
			)
		);
	}
});
