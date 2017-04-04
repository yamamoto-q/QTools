"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	getInitialState: function getInitialState() {
		return {
			workitem: this.props.workitem,
			listStyle: this.props.list_style
		};
	},
	render: function render() {
		return React.createElement(
			"li",
			{ className: "list-group-item justify-content-between" },
			this.state.workitem.nodeName,
			React.createElement(
				"span",
				{ className: "badge badge-default badge-pill" },
				"14"
			)
		);
	}
});
