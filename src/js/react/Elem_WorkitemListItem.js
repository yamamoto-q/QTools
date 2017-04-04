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
			workitem: this.props.workitem,
			listStyle: listStyle
		};
	},
	render: function render() {
		if (this.state.listStyle == Ctr_Strage.ViewType.MINIMUM) {
			return React.createElement(
				"li",
				{ className: "list-group-item justify-content-between" },
				this.state.workitem.nodeName,
				React.createElement(
					"span",
					{ className: "badge badge-default badge-pill" },
					"14"
				)
			);
		}

		return React.createElement(
			"div",
			null,
			JSON.stringify(this.state.workitem, null, 2)
		);
	}
});
