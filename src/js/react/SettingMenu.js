"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		return React.createElement(
			"ul",
			{ className: "list-group" },
			React.createElement(
				"li",
				{ className: "list-group-item" },
				"Cras justo odio"
			),
			React.createElement(
				"li",
				{ className: "list-group-item" },
				"Dapibus ac facilisis in"
			),
			React.createElement(
				"li",
				{ className: "list-group-item" },
				"Morbi leo risus"
			),
			React.createElement(
				"li",
				{ className: "list-group-item" },
				"Porta ac consectetur ac"
			),
			React.createElement(
				"li",
				{ className: "list-group-item" },
				"Vestibulum at eros"
			)
		);
	}
});
