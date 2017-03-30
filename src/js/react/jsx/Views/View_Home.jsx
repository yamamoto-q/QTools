var React = require('react');
var Header = require('./Header.js');
var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var TaskSummary = require('./View_Task_Summary.js');

var SettingMenu = require('./SettingMenu.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	onClickMenuIcon:function(){
		$("#SettingMenu #SettingMenu-box")
			.css("left","-300px");
		$("#SettingMenu.SettingMenu-modal")
			.css("opacity", "0")
			.show()
			.animate({
				opacity: 1,
				},125, function() {
					$("#SettingMenu #SettingMenu-box").animate({
						left: "0"
					},125, function() {
						/* stuff to do after animation is complete */
					});
			});
	},
	hideSettingMenu:function(e){
		e.preventDefault();
		$("#SettingMenu #SettingMenu-box")
			.animate({
				left:"-300px"
			},125, function() {
				$("#SettingMenu.SettingMenu-modal").animate({
					opacity: "0"
				},125, function() {
					$("#SettingMenu.SettingMenu-modal").css('display', 'none');
				});
			});
	},
	render: function() {
		return(
			<div className="height-fix">
				<Header on_click_menu_icon={this.onClickMenuIcon} label="Home"/>
				<div className="height-fix">
					<Bootstrap_Container>
						<Bootstrap_Row>
							<div className="col nav-items nav-items-v hidden-xs-down" style={{flexBasis:"210px", flexGrow: "0"}}>
								<NavItem icon="home">Home</NavItem>
								<NavItem icon="inbox">B</NavItem>
								<NavItem icon="chat_bubble">C</NavItem>
							</div>
							<div className="col">
								<div className="card-group">
									<TaskSummary />
								</div>
							</div>
						</Bootstrap_Row>
					</Bootstrap_Container>
				</div>
				<Footer>
					<NavItem icon="home">Home</NavItem>
					<NavItem icon="inbox">B</NavItem>
					<NavItem icon="chat_bubble">C</NavItem>
				</Footer>
				<div id="SettingMenu" className="SettingMenu-modal SettingMenu-modal-hide" onClick={this.hideSettingMenu}>
					<div id="SettingMenu-box" style={{position:"absolute", backgroundColor:"white", width:"300px", top:"0", bottom:"0"}}>
						<div className="scroll-v">
							<SettingMenu />
							<div>{BuildInfo.VERSION}</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});