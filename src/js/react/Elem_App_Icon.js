'use strict';

/**
 * アプリのアイコン表現
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');
var Ctr_Login = require('./Controller_Login.js');
var AppItem = require('./Elem_App_Item.js');

var CenterMiddle = require('./Layout_CenterMiddle.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		var classes = ["appicon"];

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

		if (isActive) {
			classes.push("appicon-active");
		} else {
			classes.push("appicon-deactive");
		}
		return React.createElement(
			'div',
			{ className: classes.join(" ") },
			React.createElement(
				'div',
				{ className: 'squarebox' },
				React.createElement(
					'div',
					{ className: 'squarebox-content' },
					React.createElement(
						CenterMiddle,
						null,
						React.createElement('span', { className: "icon icon-games" })
					)
				),
				React.createElement(
					'div',
					{ className: 'appicon-tl' },
					allocatedNum + "/" + offeredNum
				),
				React.createElement(
					'div',
					{ className: 'appicon-tr' },
					'TR'
				)
			)
		);
	}
});
