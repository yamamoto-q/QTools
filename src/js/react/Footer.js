'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	displayName: 'exports',

	componentDidMount: function componentDidMount() {
		// マウントされたとき
		Controller_View.Action.setHasFooter(true);
	},
	componentWillUnmount: function componentWillUnmount() {
		// アンマウントされるとき
		Controller_View.Action.setHasFooter(false);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ id: 'footer', className: 'nav-items' },
			this.props.children
		);
	}
});
