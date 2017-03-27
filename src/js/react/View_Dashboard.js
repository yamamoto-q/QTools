'use strict';

var React = require('react');
var Header = require('./Header.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon }),
			'Dashboard'
		);
	}
});
