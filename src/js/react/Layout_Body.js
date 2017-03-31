'use strict';

var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(
				Bootstrap_Container,
				{ className: 'height-fix' },
				React.createElement(
					Bootstrap_Row,
					{ className: 'height-fix' },
					this.props.children
				)
			)
		);
	}
});