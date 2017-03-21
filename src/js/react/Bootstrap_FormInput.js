"use strict";

var React = require('react');
module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var classes = ["form-control"];
		if (this.props.className) {
			classes = classes.concat(this.props.className.split(" "));
		}

		return React.createElement("input", { name: this.props.name, type: this.props.type, value: this.props.value, onChange: this.props.onChenge, className: classes.join(" ") });
	}
});
