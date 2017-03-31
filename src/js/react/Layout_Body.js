'use strict';

var React = require('react');

var LayoutHeader = require('./Layout_Header.js');
var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');
var ScrollArea = require('./ScrollArea.js');

var TaskSummary = require('./View_Task_Summary.js');

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
