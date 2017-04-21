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
		return React.createElement(
			'div',
			{ id: 'appicon' },
			React.createElement(
				'div',
				{ className: 'squarebox' },
				React.createElement(
					'div',
					{ className: 'squarebox-content' },
					'content'
				)
			)
		);
	}
});
