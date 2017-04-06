'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;

		return React.createElement(
			'div',
			null,
			label,
			':',
			isStarred,
			'/',
			allocatedNum,
			'/',
			offeredNum
		);
	}
});
