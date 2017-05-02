'use strict';

var React = require('react');
var Ctr_Login = require('./Controller_Login.js');
var AppIcon = require('./Elem_App_Icon.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		var classes = [];
		if (this.props.className) {
			classes = this.props.className.split(" ");
		}
		//classes.push("row");
		classes.push("app-item");
		//classes.push("app-item-view-minimum");

		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;
		var isStartable = this.props.app.startableActivitis.length > 0;
		var owner = this.props.app.processModelInfoCreateQuserName;
		var isActive = this.props.app.processModelInfoHasActiveProcessModel;

		var authorities = this.props.app.authorities || [];
		var isManager = authorities.indexOf("PROCESS_MODEL_MANAGER") != -1;

		var isOwner = Ctr_Login.Store.getLoginedUser().name == owner;

		// Star
		var starIcon = React.createElement('span', { className: 'icon icon-star_border' });
		if (isStarred) {
			starIcon = React.createElement('span', { className: 'icon icon-star' });
			classes.push("app-item-stared");
		}

		var workItemNum = null;
		if (allocatedNum + offeredNum > 0) {
			workItemNum = React.createElement(
				'span',
				{ className: 'badge badge-default badge-pill' },
				allocatedNum,
				'/',
				offeredNum
			);
			classes.push("app-item-has-workitem");
		}

		var startableIcon = null;
		if (isStartable) {
			startableIcon = React.createElement('span', { className: 'icon icon-move_to_inbox' });
			classes.push("app-item-is-startable");
		}

		//var disableIcon = null;
		if (!isActive) {
			//disableIcon = (<span className="icon icon-close"/>);
			classes.push("app-item-deactive");
		}

		var managerIcon = null;
		if (isManager) {
			managerIcon = React.createElement('span', { className: 'icon icon-face' });
			classes.push("app-item-manager");
		}

		var ownerIcon = null;
		if (isOwner) {
			ownerIcon = React.createElement('span', { className: 'icon icon-weekend' });
			classes.push("app-item-creator");
		}

		return React.createElement(
			'div',
			{ className: classes.join(" ") },
			React.createElement(
				'div',
				{ className: 'app-item-inner-wrapper' },
				React.createElement(
					'div',
					{ className: 'app-item-info app-item-info-appicon' },
					React.createElement(AppIcon, { app: this.props.app })
				),
				React.createElement(
					'div',
					{ className: 'app-item-info app-item-info-header' },
					React.createElement(
						'div',
						{ className: 'app-item-info-star' },
						starIcon
					),
					React.createElement(
						'div',
						{ className: 'app-item-info-num' },
						workItemNum,
						startableIcon
					),
					React.createElement(
						'div',
						{ className: 'app-item-info-icons' },
						ownerIcon,
						managerIcon
					)
				),
				React.createElement(
					'div',
					{ className: 'app-item-info app-item-info-body' },
					React.createElement(
						'div',
						{ className: 'app-item-info-label' },
						label
					)
				),
				React.createElement(
					'div',
					{ className: 'app-item-info app-item-info-footer' },
					React.createElement(
						'div',
						{ className: 'app-item-info-owner' },
						owner
					)
				)
			)
		);
	}
});
