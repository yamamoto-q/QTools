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
				React.createElement("input", { type: "radio", name: "options", id: "option1", autocomplete: "off" }),
				" A"
			),
			React.createElement(
				"label",
				{ className: "btn btn-primary" },
				React.createElement("input", { type: "radio", name: "options", id: "option2", autocomplete: "off" }),
				" B"
			),
			React.createElement(
				"label",
				{ className: "btn btn-primary" },
				React.createElement("input", { type: "radio", name: "options", id: "option3", autocomplete: "off" }),
				" C"
			)
		);
	}
});
