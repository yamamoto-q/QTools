'use strict';

var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			workitem: this.props.workitem
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	},
	render: function render() {
		//console.log(this.state.workitem);

		if (this.props.list_style == Ctr_Strage.ViewType.MINIMUM) {
			return React.createElement(
				'li',
				{ className: 'list-group-item justify-content-between' },
				this.state.workitem.nodeName,
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
			JSON.stringify(this.state.workitem, null, 2)
		);
	}
});
