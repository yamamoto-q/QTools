"use strict";

var React = require('react');

module.exports = React.createClass({
	displayName: "exports",

	render: function render() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;
		var isStartable = this.props.app.startableActivitis.length > 0;
		var owner = this.props.app.processModelInfoCreateQuserName;
		var isActive = this.props.app.processModelInfoHasActiveProcessModel;

		var authorities = this.props.app.authorities || [];
		var isManager = authorities.indexOf("PROCESS_MODEL_MANAGER") != -1;

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
		if (isStartable) {
			startableIcon = React.createElement("span", { className: "icon icon-move_to_inbox" });
		}

		var disableIcon = null;
		if (isActive) {
			disableIcon = React.createElement("span", { className: "icon icon-close" });
		}

		var managerIcon = null;
		if (isManager) {
			managerIcon = React.createElement("span", { className: "icon icon-face" });
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
				disableIcon,
				workItemNum,
				startableIcon,
				managerIcon
			),
			React.createElement(
				"div",
				{ className: "col" },
				label
			),
			React.createElement(
				"div",
				{ className: "col" },
				owner
			)
		);
	}
});
