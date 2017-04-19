/**
 * アプリ一覧
 **/
var React = require('react');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<pre>{JSON.stringify(this.props.apps, null, 2)}</pre>
			</div>
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