'use strict';

var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		//console.log(this.state.workitem);
		var classes = [];
		if (this.props.className) {
			classes = this.props.className.split(" ");
		}

		classes.push("workitem");

		// 既読Style
		if (this.props.workitem.read) {
			classes.push("workitem-readed");
		} else {
			classes.push("workitem-unread");
		}

		if (this.props.list_style == Ctr_Strage.ViewType.MINIMUM) {
			classes.push("list-group-item");
			//classes.push("justify-content-between");

			return React.createElement(
				'li',
				{ className: classes.join(" ") },
				this.props.workitem.processInstanceTitle
			);
		} else if (this.props.list_style == Ctr_Strage.ViewType.CARD) {
			classes.push("card");
			return React.createElement(
				'div',
				{ className: classes.join(" ") },
				React.createElement(
					'div',
					{ className: 'card-block' },
					React.createElement(
						'h4',
						{ className: 'card-title' },
						this.props.workitem.processInstanceTitle
					),
					React.createElement(
						'p',
						{ className: 'card-text' },
						JSON.stringify(this.props.workitem, null, 2)
					)
				)
			);
		}

		return React.createElement(
			'div',
			null,
			JSON.stringify(this.props.workitem, null, 2)
		);
	}
});
