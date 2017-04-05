'use strict';

var React = require('react');
var ScrollArea = require('./ScrollArea.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			{ id: 'body-right', className: 'col' },
			React.createElement(
				ScrollArea,
				null,
				this.props.children
			)
		);
	}
});
