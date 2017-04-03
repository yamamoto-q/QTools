"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "btn-group", "data-toggle": "buttons" },
			React.createElement(
				"label",
				{ className: "btn btn-primary active" },
				React.createElement("input", { type: "radio", name: "options", id: "option1", autoComplete: "off" }),
				" A"
			),
			React.createElement(
				"label",
				{ className: "btn btn-primary" },
				React.createElement("input", { type: "radio", name: "options", id: "option2", autoComplete: "off" }),
				" B"
			),
			React.createElement(
				"label",
				{ className: "btn btn-primary" },
				React.createElement("input", { type: "radio", name: "options", id: "option3", autoComplete: "off" }),
				" C"
			)
		);
	}
});
