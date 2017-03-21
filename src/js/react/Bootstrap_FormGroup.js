"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = ["form-group"];
		if (typeof this.ptops.className !== "undefined") {
			classes = classes.concat(this.ptops.className.split(" "));
		}
		return React.createElement(
			"div",
			{ className: classes.join(" ") },
			this.props.children
		);
	}
});
