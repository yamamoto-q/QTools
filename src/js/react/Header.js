'use strict';

var React = require('react');
var _Login = require('./Controller_Login.js');
var _QApi = require('./Controller_Questetra_API.js');
var Avater = require('./Avater.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var loginedUser = _Login.Store.getLoginedUser();

		_QApi.Action.getAvater(loginedUser.id);

		return {
			id: loginedUser.id,
			mail: loginedUser.mail,
			name: loginedUser.name
		};
	},
	onClickMenuIcon: function onClickMenuIcon(e) {
		e.preventDefault();
	},
	onClickLogout: function onClickLogout() {
		_Login.Action.logout();
	},
	render: function render() {
		return React.createElement(
			'div',
			{ id: 'header' },
			React.createElement(
				'div',
				{ className: 'bar-left' },
				React.createElement(
					'div',
					{ className: 'bar-item' },
					React.createElement('span', { className: 'icon icon-menu', onClick: this.onClickMenuIcon })
				)
			),
			React.createElement(
				'div',
				{ className: 'bar-right' },
				React.createElement(
					'div',
					{ className: 'bar-item dropdown' },
					React.createElement(
						'div',
						{ 'data-toggle': 'dropdown' },
						React.createElement(Avater, { quser_id: this.state.id })
					),
					React.createElement(
						'div',
						{ className: 'dropdown-menu dropdown-menu-right' },
						React.createElement(
							'h6',
							{ className: 'dropdown-header' },
							this.state.name
						),
						React.createElement('div', { className: 'dropdown-divider' }),
						React.createElement(
							'a',
							{ className: 'dropdown-item', onClick: this.onClickLogout },
							'Logout'
						)
					)
				)
			)
		);
	}
});
