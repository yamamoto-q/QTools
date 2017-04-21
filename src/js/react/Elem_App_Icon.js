'use strict';

/**
 * アプリ一覧
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		var classes = ["appicon"];
		if (this.props.isActive) {
			classes.push("appicon-active");
		} else {
			classes.push("appicon-deactive");
		}
		return React.createElement(
			'div',
			{ className: classes.join(" ") },
			React.createElement(
				'div',
				{ className: 'squarebox' },
				React.createElement(
					'div',
					{ className: 'squarebox-content' },
					'content'
				)
			),
			React.createElement(
				'div',
				{ className: 'appicon-tl' },
				'TL'
			),
			React.createElement(
				'div',
				{ className: 'appicon-tr' },
				'TR'
			)
		);
	}
});
