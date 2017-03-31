'use strict';

var React = require('react');
var ScrollArea = require('./ScrollArea.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'col nav-items nav-items-v hidden-xs-down', style: { flexBasis: "210px", flexGrow: "0" } },
			React.createElement(
				ScrollArea,
				null,
				this.props.children
			)
		);
	}
});
