'use strict';

var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var listStyle = Ctr_Strage.Store.getMyWorkitemListViewType();
		return {
			listStyle: listStyle
		};
	},
	onClick: function onClick(e) {
		var listType = e.currentTarget.getAttribute('data-listtype');
		console.log("onClick:" + listType);
		Ctr_Strage.Action.setMyWorkitemListViewType(listType);
	},
	onChanged: function onChanged(e) {
		console.log("onChanged");
	},
	render: function render() {
		var minimum_label_classes = ["btn", "btn-primary"];
		if (this.state.listStyle == Ctr_Strage.ViewType.MINIMUM) {
			minimum_label_classes.push("active");
		}

		var card_label_classes = ["btn", "btn-primary"];
		if (this.state.listStyle == Ctr_Strage.ViewType.CARD) {
			card_label_classes.push("active");
		}
		return React.createElement(
			'div',
			{ className: 'btn-group', 'data-toggle': 'buttons' },
			React.createElement(
				'label',
				{ className: minimum_label_classes.join(" "), onClick: this.onClick, 'data-listtype': Ctr_Strage.ViewType.MINIMUM },
				React.createElement('input', { type: 'radio', name: 'options', onChange: this.onChanged, checked: this.state.listStyle == Ctr_Strage.ViewType.MINIMUM }),
				React.createElement('span', { className: "icon icon-view_headline" })
			),
			React.createElement(
				'label',
				{ className: card_label_classes.join(" "), onClick: this.onClick, 'data-listtype': Ctr_Strage.ViewType.CARD },
				React.createElement('input', { type: 'radio', name: 'options', onChange: this.onChanged, checked: this.state.listStyle == Ctr_Strage.ViewType.CARD }),
				React.createElement('span', { className: "icon icon-view_module" })
			)
		);
	}
});
