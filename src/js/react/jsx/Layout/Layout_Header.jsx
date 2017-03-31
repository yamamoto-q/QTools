var React = require('react');
var Header = require('./Header.js');
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
				<Header on_click_menu_icon={this.onClickMenuIcon} label={this.props.label}/>
				{this.props.children}
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