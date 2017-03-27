'use strict';

var _React$createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');

var ToDo = require('./ToDo.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

module.exports = React.createClass({
	displayName: 'exports',

	onClickMenuIcon: function onClickMenuIcon() {
		$("#sideMenu #sideMenu-box").css("left");
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
		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon }),
			React.createElement(RouteHandler, null),
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

var routes = React.createElement(
	Route,
	(_React$createElement = { path: 'app' }, _defineProperty(_React$createElement, 'path', '/'), _defineProperty(_React$createElement, 'component', ToDo), _React$createElement),
	React.createElement(Route, { path: 'inbox', component: ToDo }),
	React.createElement(Route, { path: '*', component: ToDo })
);
