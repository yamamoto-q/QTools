var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');
var Controller_View = require('./Controller_View.js');

var Dashboard = require('./Dashboard.js');
var AdminTools = require('./View_AdminTools.js');
var ToDo = require('./ToDo.js');

module.exports = React.createClass({
	getInitialState: function() {
		var viewName = Controller_View.Store.getViewNane();
		return {
			viewName:viewName
		};
	},
	componentDidMount: function() {
		var self = this;
		Controller_View.Store.addChangeViewListener(function () {
			if (self.isMounted()) {
				var viewName = Controller_View.Store.getViewNane();
				console.log(viewName);
				/*
				self.setState({
					showSplash:isWaitingStrage,
					showAuthInput:isValidAuthParam == false || loginSuccess == false || changeAuth == true,
					showLogining:isChallengeLogin == true,
					loginSuccess:loginSuccess,
					loginedUser:loginedUser
				});
				*/
			};
		});
	},
	onClickMenuIcon:function(){
		$("#sideMenu #sideMenu-box")
			.css("left","-300px");
		$("#sideMenu.sideMenu-modal")
			.css("opacity", "0")
			.show()
			.animate({
				opacity: 1,
				},250, function() {
					$("#sideMenu #sideMenu-box").animate({
						left: "0"
					},250, function() {
						/* stuff to do after animation is complete */
					});
			});
	},
	hideSideMenu:function(e){
		e.preventDefault();
		$("#sideMenu #sideMenu-box")
			.animate({
				left:"-300px"
			},250, function() {
				$("#sideMenu.sideMenu-modal").animate({
					opacity: "0"
				},250, function() {
					$("#sideMenu.sideMenu-modal").css('display', 'none');
				});
			});
	},
	render: function() {
		var viewBody;
		switch (this.state.viewName){
			case Controller_View.ViewNames.DASHBOARD:
				viewBody = (<Dashboard />);
				break;

		}

		
		return (
			<div className="height-fix">
				<Header on_click_menu_icon={this.onClickMenuIcon}/>
				{viewBody}
				<div id="sideMenu" className="sideMenu-modal sideMenu-modal-hide" onClick={this.hideSideMenu}>
					<div id="sideMenu-box" style={{position:"absolute", backgroundColor:"white", width:"300px", top:"0", bottom:"0"}}>
						<SettingMenu />
						<div>{BuildInfo.VERSION}</div>
					</div>
				</div>
			</div>
		);
	}
});

