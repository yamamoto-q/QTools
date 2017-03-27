'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'list-group' },
			React.createElement(
				Link,
				{ to: '/' },
				'index'
			),
			React.createElement(
				Link,
				{ to: '/ToDo' },
				'ToDo'
			),
			React.createElement(
				'a',
				{ href: '#', className: 'list-group-item active' },
				'Cras justo odio'
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
			)
		);
	}
});
