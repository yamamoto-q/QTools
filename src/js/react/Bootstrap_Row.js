"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = ["row"];
		if (this.props.className) {
			classes = classes.concat(this.props.className.split(" "));
		}

		var style = {};
		if (typeof this.props.wrap !== "undefined" && (!this.props.wrap || this.props.wrap == "false")) {
			style.flexWrap = "nowrap";
		}

		return React.createElement(
			"div",
			{ className: classes.join(" "), style: style },
			this.props.children
		);
	}
});
