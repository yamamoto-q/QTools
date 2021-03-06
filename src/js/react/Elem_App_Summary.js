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
		if (this.state.staredApps.length > 0) {
			for (var i = this.state.staredApps.length - 1; i >= 0; i--) {
				var staredApp = this.state.staredApps[i];
				console.log("staredApp", staredApp);
				var allocatedNum = staredApp.allocatedWorkitems.length;
				var offeredNum = staredApp.offeredWorkitems.length;
				staredApps.push(React.createElement(
					'li',
					{ key: "apps-summary-stared-apps-" + staredApp.processModelInfoId, className: 'list-group-item justify-content-between' },
					React.createElement('span', { className: 'icon icon-star' }),
					React.createElement(
						'span',
						null,
						staredApp.processModelInfoName
					),
					React.createElement(
						'span',
						{ className: 'badge badge-default badge-pill' },
						allocatedNum,
						'/',
						offeredNum
					)
				));
			}
		} else {
			staredApps.push(React.createElement(
				'li',
				{ key: "apps-summary-stared-apps-info", className: 'list-group-item justify-content-between' },
				React.createElement('span', { className: 'icon icon-info' }),
				React.createElement(
					'span',
					null,
					'\u30B9\u30BF\u30FC'
				)
			));
		}

		return React.createElement(
			'div',
			{ className: 'card card-apps-summary', onClick: this.onClick, 'data-viewname': Controller_View.ViewNames.APPS },
			React.createElement(
				'div',
				{ className: 'card-block card-block-header' },
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
