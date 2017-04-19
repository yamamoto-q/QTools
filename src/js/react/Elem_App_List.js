'use strict';

/**
 * アプリ一覧
 **/
var React = require('react');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'pre',
				null,
				JSON.stringify(this.props.apps, null, 2)
			)
		);
	}
});

/*
		for (var i = 0; i < this.state.sortAndFilteredApps.length; i++) {
			allApps.push(
				<AppItem key={"view-apps-app-" + this.state.sortAndFilteredApps[i].processModelInfoId} app={this.state.sortAndFilteredApps[i]} />
			);
		}
*/
