"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = ["btn"];
		if (this.props.className) {
			classes = classes.concat(this.props.className.split(" "));
		}

		return React.createElement(
			"button",
			{ type: "button", onClick: this.props.on_click, className: classes.join(" ") },
			this.props.label
		);
	}
});
