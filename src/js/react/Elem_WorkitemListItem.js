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

		if (this.props.list_style == Ctr_Strage.ViewType.MINIMUM) {
			classes.push("list-group-item");
			classes.push("justify-content-between");

			if (this.props.workitem.read) {
				classes.push("workitem-readed");
			} else {
				classes.push("workitem-unread");
			}

			return React.createElement(
				'li',
				{ className: classe.join(" ") },
				this.props.workitem.nodeName,
				React.createElement(
					'span',
					{ className: 'badge badge-default badge-pill' },
					'14'
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
