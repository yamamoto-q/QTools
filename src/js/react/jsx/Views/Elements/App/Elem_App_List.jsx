/**
 * アプリ一覧
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = Ctr_Strage.Store.getAppListStyle();
		return {
			listStyle:listStyle
		}
	},
	componentDidMount: function() {
		var self = this;

		// 表示方法が更新されたとき
		Ctr_Strage.Store.addChangeAppListStyleListener(function(){
			if (self.isMounted()) {
				var listStyle = Ctr_Strage.Store.getAppListStyle();
				self.setState({
					listStyle:listStyle
				});
			}
		});
	},
	render: function() {
		var apps = [];
		for (var i = 0; i < this.props.apps.length; i++) {
			var appinfo = this.props.apps[i];
			apps.push(
				<AppItem key={"elem-app-list-" + appinfo.processModelInfoId} app={appinfo} />
			);
		}

		return (
			<div>
				{apps}
			</div>
		);
	}
});