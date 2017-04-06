"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;

		// Star
		var starIcon = React.createElement("span", { className: "icon icon-star_border" });
		if (isStarred) {
			starIcon = React.createElement("span", { className: "icon icon-star" });
		}

		var workItemNum = null;
		if (allocatedNum + offeredNum > 0) {
			workItemNum = React.createElement(
				"span",
				{ className: "badge badge-default badge-pill" },
				allocatedNum,
				"/",
				offeredNum
			);
		}

		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col" },
				starIcon
			),
			React.createElement(
				"div",
				{ className: "col" },
				workItemNum
			),
			React.createElement(
				"div",
				{ className: "col" },
				label
			)
		);
	}
});
