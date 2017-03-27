'use strict';

var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	displayName: 'exports',

	onclickBack: function onclickBack() {
		Controller_View.Action.historyBack();
	},
	render: function render() {
		return React.createElement(
			Bootstrap_Container,
			null,
			React.createElement(
				Bootstrap_Row,
				null,
				React.createElement(
					Bootstrap_Col,
					null,
					React.createElement(
						'a',
						{ onClick: this.onclickBack },
						'Back'
					)
				)
			)
		);
	}
});
