'use strict';

var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var staredApps = Ctr_QApi.Store.getStaredApps();
		return {
			staredApps: staredApps
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;
		Ctr_QApi.Store.addChangeAppsListener(function () {
			if (self.isMounted()) {
				var staredApps = Ctr_QApi.Store.getStaredApps();
				self.setState({
					staredApps: staredApps
				});
			}
		});

		Ctr_QApi.Action.getApps();
	},
	onClick: function onClick(e) {
		e.preventDefault();
		var viewName = e.currentTarget.getAttribute('data-viewname');
		Controller_View.Action.setView(viewName);
	},
	render: function render() {
		var staredApps = [];
		for (var i = this.state.staredApps.length - 1; i >= 0; i--) {
			var staredApp = this.state.staredAppss[i];
			staredApps.push(React.createElement(
				'li',
				{ key: "apps-summary-stared-apps-" + staredApp.processModelInfoId, className: 'list-group-item' },
				staredApp.processModelInfoName
			));
		}
		return React.createElement(
			'div',
			{ className: 'card', onClick: this.onClick, 'data-viewname': Controller_View.ViewNames.WORK },
			React.createElement(
				'div',
				{ className: 'card-block' },
				React.createElement(
					'h4',
					{ className: 'card-title' },
					'Apps'
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
				staredApps
			)
		);
	}
});
