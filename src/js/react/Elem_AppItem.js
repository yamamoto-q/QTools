"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;
		var startable = this.props.app.startableActivitis > 0;

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

		var startableIcon = null;
		if (startable) {
			startableIcon = React.createElement("span", { className: "icon-move_to_inbox" });
		}

		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "col", style: { maxWidth: "16px" } },
				starIcon
			),
			React.createElement(
				"div",
				{ className: "col" },
				workItemNum,
				startableIcon
			),
			React.createElement(
				"div",
				{ className: "col" },
				label
			)
		);
	}
});
