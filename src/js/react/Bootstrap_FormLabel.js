"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = [];
		if (this.props.className) {
			classes = classes.concat(this.props.className.split(" "));
		}

		return React.createElement(
			"label",
			{ className: classes, "for": this.props.htmlFor },
			this.props.label
		);
	}
});
