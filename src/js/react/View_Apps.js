'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var Ctr_QApi = require('./Controller_Questetra_API.js');

var AppItem = require('./Elem_AppItem.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var apps = this.sortApp(Ctr_QApi.Store.getApps());
		return {
			apps: apps
		};
	},
	componentDidMount: function componentDidMount() {
		$("body").addClass('view-' + Controller_View.ViewNames.APPS);

		var self = this;
		Ctr_QApi.Store.addChangeAppsListener(function () {
			if (self.isMounted()) {
				var apps = self.sortApp(Ctr_QApi.Store.getApps());
				self.setState({
					apps: apps
				});
			}
		});

		Ctr_QApi.Action.getApps();
	},
	componentWillUnmount: function componentWillUnmount() {
		$("body").removeClass('view-' + Controller_View.ViewNames.APPS);
	},
	sortApp: function sortApp(apps) {
		//processModelInfoHasActiveProcessModel
		apps.sort(function (a, b) {
			if (a.processModelInfoHasActiveProcessModel && !b.processModelInfoHasActiveProcessModel) {
				return -1;
			}
			if (!a.processModelInfoHasActiveProcessModel && b.processModelInfoHasActiveProcessModel) {
				return 1;
			}
			return 0;
		});

		// offeredWorkitems
		apps.sort(function (a, b) {
			if (a.offeredWorkitems.length > b.offeredWorkitems.length) {
				return -1;
			}
			if (a.offeredWorkitems.length < b.offeredWorkitems.length) {
				return 1;
			}
			return 0;
		});

		// allocatedWorkitems
		apps.sort(function (a, b) {
			if (a.allocatedWorkitems.length > b.allocatedWorkitems.length) {
				return -1;
			}
			if (a.allocatedWorkitems.length < b.allocatedWorkitems.length) {
				return 1;
			}
			return 0;
		});

		// Stared
		apps.sort(function (a, b) {
			if (a.starred && !b.starred) {
				return -1;
			}
			if (!a.starred && b.starred) {
				return 1;
			}
			return 0;
		});
		return apps;
	},
	render: function render() {
		var allApps = [];

		console.log("apps", this.state.apps);
		for (var i = 0; i < this.state.apps.length; i++) {
			allApps.push(React.createElement(AppItem, { key: "view-apps-app-" + this.state.apps.processModelInfoId, app: this.state.apps[i] }));
		}

		return React.createElement(
			LayoutHeader,
			{ label: 'Apps' },
			React.createElement(
				LayoutBody,
				null,
				React.createElement(
					LayoutBodyLeft,
					null,
					React.createElement(
						NavItem,
						{ icon: 'home', view_name: Controller_View.ViewNames.HOME },
						'Home'
					),
					React.createElement(
						NavItem,
						{ icon: 'inbox', view_name: Controller_View.ViewNames.WORK },
						'Work'
					),
					React.createElement(
						NavItem,
						{ icon: 'games', active: true },
						'Apps'
					)
				),
				React.createElement(
					LayoutBodyRight,
					null,
					React.createElement(
						'ul',
						{ className: 'nav nav-tabs', role: 'tablist' },
						React.createElement(
							'li',
							{ className: 'nav-item' },
							React.createElement(
								'a',
								{ className: 'nav-link active', 'data-toggle': 'tab', href: '#home', role: 'tab' },
								'Home'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'tab-content' },
						React.createElement(
							'div',
							{ className: 'tab-pane active', id: 'home', role: 'tabpanel' },
							allApps
						)
					)
				)
			),
			React.createElement(
				Footer,
				null,
				React.createElement(
					NavItem,
					{ icon: 'home', view_name: Controller_View.ViewNames.HOME },
					'Home'
				),
				React.createElement(
					NavItem,
					{ icon: 'inbox', view_name: Controller_View.ViewNames.WORK },
					'Work'
				),
				React.createElement(
					NavItem,
					{ icon: 'games', active: true },
					'Apps'
				)
			)
		);
	}
});
