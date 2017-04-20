'use strict';

/**
 * アプリ一覧
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var listStyle = Ctr_Strage.Store.getAppListStyle();
		return {
			listStyle: listStyle
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;

		// 表示方法が更新されたとき
		Ctr_Strage.Store.addChangeAppListStyleListener(function () {
			if (self.isMounted()) {
				var listStyle = Ctr_Strage.Store.getAppListStyle();
				self.setState({
					listStyle: listStyle
				});
			}
		});
	},
	render: function render() {
		var wrapperClasses = ["app-list", "app-list-liststyle-" + this.state.listStyle];

		var apps = [];
		for (var i = 0; i < this.props.apps.length; i++) {
			var appinfo = this.props.apps[i];
			apps.push(React.createElement(AppItem, { key: "app-list-appitem-" + appinfo.processModelInfoId, app: appinfo }));
		}

		return React.createElement(
			'div',
			{ className: wrapperClasses.join(" ") },
			apps
		);
	}
});
