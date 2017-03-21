"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = ["row"];
		if (this.props.className) {
			classes = classes.concat(this.props.className.split(" "));
		}

		return React.createElement(
			"div",
			{ className: classes.join(" ") },
			this.props.children
		);
	}
});
