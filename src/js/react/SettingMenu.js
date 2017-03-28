'use strict';

var React = require('react');
var ReactRouter = require('react-router');

var _Login = require('./Controller_Login.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var permission = _Login.Store.getPermission();
		return {
			permission: permission
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;
		_Login.Store.addChangePermissionListener(function () {
			if (self.isMounted()) {
				var permission = _Login.Store.getPermission();
				self.setState({
					permission: permission
				});
			}
		});
	},
	conClick: function conClick(e) {
		var viewName = e.target.getAttribute('data-viewname');
		Controller_View.Action.setView(viewName);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'list-group' },
			React.createElement(
				'a',
				{ href: '#', className: 'list-group-item list-group-item-action', 'data-viewname': Controller_View.ViewNames.ADMIN_TOOLS, onClick: this.conClick },
				'Admin Tools'
			),
			React.createElement(
				'a',
				{ href: '#', className: 'list-group-item list-group-item-action' },
				'Dapibus ac facilisis in'
			),
			React.createElement(
				'a',
				{ href: '#', className: 'list-group-item list-group-item-action' },
				'Morbi leo risus'
			),
			React.createElement(
				'a',
				{ href: '#', className: 'list-group-item list-group-item-action' },
				'Porta ac consectetur ac'
			),
			React.createElement(
				'a',
				{ href: '#', className: 'list-group-item list-group-item-action disabled' },
				'Vestibulum at eros'
			),
			React.createElement(
				'pre',
				null,
				JSON.stringify(this.state.permission, null, 2)
			)
		);
	}
});
