"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		return React.createElement(
			"div",
			{ style: { display: "table", height: "100%", width: "100%" } },
			React.createElement(
				"div",
				{ style: { display: "table-cell", verticalAlign: "middle", textAlign: "center" } },
				this.props.children
			)
		);
	}
});
