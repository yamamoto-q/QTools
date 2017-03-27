'use strict';

var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');

var ToDo = require('./ToDo.js');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Link = ReactRouter.Link;

var routes = React.createElement(
	Router,
	{ history: hashHistory },
	React.createElement(Route, { path: '/', component: ToDo }),
	React.createElement(Route, { path: '*', component: ToDo })
);

module.exports = React.createClass({
	displayName: 'exports',

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
		return React.createElement(
			'div',
			{ className: 'height-fix' },
			React.createElement(Header, { on_click_menu_icon: this.onClickMenuIcon }),
			routes,
			React.createElement(
				'div',
				{ id: 'sideMenu', className: 'sideMenu-modal sideMenu-modal-hide', onClick: this.hideSideMenu },
				React.createElement(
					'div',
					{ id: 'sideMenu-box', style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", bottom: "0" } },
					React.createElement(
						'div',
						{ className: 'list-group' },
						React.createElement(
							Link,
							{ to: '/', className: 'list-group-item list-group-item-action' },
							'index'
						),
						React.createElement(
							Link,
							{ to: '/ToDo', className: 'list-group-item list-group-item-action' },
							'ToDo'
						),
						React.createElement(
							'a',
							{ href: '#', className: 'list-group-item active' },
							'Cras justo odio'
						),
						React.createElement(
							'a',
							{ href: '#', className: 'list-group-item list-group-item-action' },
							'Dapibus ac facilisis in'
						),
						React.createElement(
							'a',
							{ href: '#', className: 'list-group-item list-group-item-action' },
							'Morbi leo risus'
						),
						React.createElement(
							'a',
							{ href: '#', className: 'list-group-item list-group-item-action' },
							'Porta ac consectetur ac'
						),
						React.createElement(
							'a',
							{ href: '#', className: 'list-group-item list-group-item-action disabled' },
							'Vestibulum at eros'
						)
					),
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
