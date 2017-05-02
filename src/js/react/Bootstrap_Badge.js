"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = ["badge"];
		if (this.props.className) {
			classes = classes.concat(this.props.className.split(" "));
		}

		if (this.props.appearance) {
			classes.push("badge-" + this.props.appearance);
		}

		return React.createElement(
			"div",
			{ className: classes.join(" ") },
			this.props.children
		);
	}
});
