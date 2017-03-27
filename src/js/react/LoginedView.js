'use strict';

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');
var Controller_View = require('./Controller_View.js');

var Dashboard = require('./Dashboard.js');
var AdminTools = require('./View_AdminTools.js');
var ToDo = require('./ToDo.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var viewName = Controller_View.Store.getViewNane();
		return {
			viewName: viewName
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;
		Controller_View.Store.addChangeViewListener(function () {
			if (self.isMounted()) {
				var viewName = Controller_View.Store.getViewNane();
				self.setState({
					viewName: viewName
				});
			};
		});
	},
	onClickMenuIcon: function onClickMenuIcon() {
		$("#sideMenu #sideMenu-box").css("left", "-300px");
		$("#sideMenu.sideMenu-modal").css("opacity", "0").show().animate({
			opacity: 1
		}, 250, function () {
			$("#sideMenu #sideMenu-box").animate({
				left: "0"
			}, 250, function () {
				/* stuff to do after animation is complete */
			});
		});
	},
	hideSideMenu: function hideSideMenu(e) {
		e.preventDefault();
		$("#sideMenu #sideMenu-box").animate({
			left: "-300px"
		}, 250, function () {
			$("#sideMenu.sideMenu-modal").animate({
				opacity: "0"
			}, 250, function () {
				$("#sideMenu.sideMenu-modal").css('display', 'none');
			});
		});
	},
	render: function render() {
		var viewBody;
		switch (this.state.viewName) {
			case Controller_View.ViewNames.DASHBOARD:
				viewBody = React.createElement(Dashboard, null);
				break;
			case Controller_View.ViewNames.ADMIN_TOOLS:
				viewBody = React.createElement(AdminTools, null);
				break;
		}

		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon }),
			viewBody,
			React.createElement(
				'div',
				{ id: 'sideMenu', className: 'sideMenu-modal sideMenu-modal-hide', onClick: this.hideSideMenu },
				React.createElement(
					'div',
					{ id: 'sideMenu-box', style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", bottom: "0" } },
					React.createElement(SettingMenu, null),
					React.createElement(
						'div',
						null,
						BuildInfo.VERSION
					)
				)
			)
		);
	}
});
