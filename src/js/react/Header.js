'use strict';

var React = require('react');
var _Login = require('./Controller_Login.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var loginedUser = _Login.Store.getLoginedUser();
		return {
			id: loginedUser.id,
			mail: loginedUser.mail,
			name: loginedUser.name
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			'header ',
			this.state.name
		);
	}
});
