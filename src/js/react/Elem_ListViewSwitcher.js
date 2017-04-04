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
				{ className: "btn" },
				React.createElement("input", { type: "radio", name: "options", id: "option1", autoComplete: "off" }),
				React.createElement("span", { className: "icon icon-view_list" })
			),
			React.createElement(
				"label",
				{ className: "btn" },
				React.createElement("input", { type: "radio", name: "options", id: "option2", autoComplete: "off" }),
				React.createElement("span", { className: "icon icon-view_module" })
			)
		);
	}
});
