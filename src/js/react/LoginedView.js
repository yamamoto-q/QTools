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
		var modalStyle = {
			position: "absolute", backgroundColor: "rgba(0,0,0,0.5)", right: "0", top: "0", left: "0", bottom: "0", zIndex: "999"
		};

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
				{ id: 'sideMenu', className: modalClasses.join(" "), style: modalStyle },
				React.createElement(
					'div',
					{ style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", left: "0", bottom: "0" } },
					'hoge',
					JSON.stringify(this.state, null, 2)
				)
			)
		);
	}
});
