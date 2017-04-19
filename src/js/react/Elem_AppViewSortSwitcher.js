'use strict';

var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var appSortType = Ctr_Strage.Store.getAppListViewSortType();
		return {
			appSortType: appSortType
		};
	},
	onClick: function onClick(e) {
		var appSortType = e.currentTarget.getAttribute('data-sorttype');
		console.log("onClick:" + appSortType);
		Ctr_Strage.Action.setAppListViewSortType(appSortType);
	},
	onChanged: function onChanged(e) {
		console.log("onChanged");
	},
	render: function render() {
		var ai_label_classes = ["btn", "btn-primary"];
		if (this.state.appSortType == Ctr_Strage.AppSortTypes.AI) {
			ai_label_classes.push("active");
		}

		var startable_label_classes = ["btn", "btn-primary"];
		if (this.state.appSortType == Ctr_Strage.AppSortTypes.STARTABLE) {
			startable_label_classes.push("active");
		}

		var manager_label_classes = ["btn", "btn-primary"];
		if (this.state.appSortType == Ctr_Strage.AppSortTypes.MANAGER) {
			manager_label_classes.push("active");
		}

		var owner_label_classes = ["btn", "btn-primary"];
		if (this.state.appSortType == Ctr_Strage.AppSortTypes.OWNER) {
			owner_label_classes.push("active");
		}

		return React.createElement(
			'div',
			{ className: 'btn-group', 'data-toggle': 'buttons' },
			React.createElement(
				'label',
				{ className: ai_label_classes.join(" "), onClick: this.onClick, 'data-sorttype': Ctr_Strage.AppSortTypes.AI },
				React.createElement('input', { type: 'radio', name: 'options', onChange: this.onChanged, checked: this.state.appSortType == Ctr_Strage.AppSortTypes.AI }),
				'AI'
			),
			React.createElement(
				'label',
				{ className: startable_label_classes.join(" "), onClick: this.onClick, 'data-sorttype': Ctr_Strage.AppSortTypes.STARTABLE },
				React.createElement('input', { type: 'radio', name: 'options', onChange: this.onChanged, checked: this.state.appSortType == Ctr_Strage.AppSortTypes.STARTABLE }),
				React.createElement('span', { className: "icon icon-move_to_inbox" })
			),
			React.createElement(
				'label',
				{ className: manager_label_classes.join(" "), onClick: this.onClick, 'data-sorttype': Ctr_Strage.AppSortTypes.MANAGER },
				React.createElement('input', { type: 'radio', name: 'options', onChange: this.onChanged, checked: this.state.appSortType == Ctr_Strage.AppSortTypes.MANAGER }),
				React.createElement('span', { className: "icon icon-face" })
			),
			React.createElement(
				'label',
				{ className: owner_label_classes.join(" "), onClick: this.onClick, 'data-sorttype': Ctr_Strage.AppSortTypes.OWNER },
				React.createElement('input', { type: 'radio', name: 'options', onChange: this.onChanged, checked: this.state.appSortType == Ctr_Strage.AppSortTypes.OWNER }),
				React.createElement('span', { className: "icon icon-weekend" })
			)
		);
	}
});
