"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	getInitialState: function getInitialState() {
		var listStyle = this.props.list_style;
		if (typeof listStyle === "undefined" || !listStyle || listStyle.length == 0) {
			listStyle = Ctr_Strage.ViewType.MINIMUM;
		}

		return {
			listStyle: listStyle
		};
	},
	render: function render() {
		var minimum_label_classes = ["btn"];
		if (this.state.listStyle == Ctr_Strage.ViewType.MINIMUM) {
			minimum_label_classes.push("active");
		}
		return React.createElement(
			"div",
			{ className: "btn-group", "data-toggle": "buttons" },
			React.createElement(
				"label",
				{ className: minimum_label_classes.join(" ") },
				React.createElement("input", { type: "radio", name: "options", id: "option1", autoComplete: "off", checked: this.state.listStyle == Ctr_Strage.ViewType.MINIMUM }),
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
