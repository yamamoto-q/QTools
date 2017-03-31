'use strict';

var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
		return {
			allocatedWorkitems: allocatedWorkitems,
			offeredWorkitems: offeredWorkitems
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;

		_QApi.Store.addChangeAllocatedWorkitemsListener(function () {
			if (self.isMounted()) {
				var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
				self.setState({
					allocatedWorkitems: allocatedWorkitems
				});
			}
		});

		_QApi.Store.addChangeOfferedWorkitemsListener(function () {
			if (self.isMounted()) {
				var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
				self.setState({
					offeredWorkitems: offeredWorkitems
				});
			}
		});

		_QApi.Action.getAllocatedWorkitems();
		_QApi.Action.getOfferedWorkitems();
	},
	onClick: function onClick(e) {

		var viewName = e.target.getAttribute('data-viewname');
		e.preventDefault();

		console.log(viewName);
		Controller_View.Action.setView(viewName);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'card', onClick: this.onClick, 'data-viewname': Controller_View.ViewNames.ADMIN_TOOLS },
			React.createElement(
				'div',
				{ className: 'card-block' },
				React.createElement(
					'h4',
					{ className: 'card-title' },
					'Work!'
				),
				React.createElement(
					'p',
					{ className: 'card-text' },
					'Hoge'
				)
			),
			React.createElement(
				'ul',
				{ className: 'list-group list-group-flush' },
				React.createElement(
					'li',
					{ className: 'list-group-item' },
					'allocatedWorkitems ',
					this.state.allocatedWorkitems.length
				),
				React.createElement(
					'li',
					{ className: 'list-group-item' },
					'offeredWorkitems ',
					this.state.offeredWorkitems.length
				)
			)
		);
	}
});
