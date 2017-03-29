var React = require('react');
var Header = require('./Header.js');
var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var SettingMenu = require('./SettingMenu.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
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
		return(
			<div className="height-fix">
				<Header on_click_menu_icon={this.onClickMenuIcon}>
					<NavItem>A</NavItem>
					<NavItem>B</NavItem>
					<NavItem>C</NavItem>
				</Header>
				<div className="height-fix">
					<Bootstrap_Container>
						<Bootstrap_Row>
							<div className="col hidden-xs-down" style={{flexBasis:"210px", flexGrow: "0"}}>
								side
							</div>
							<div className="col">
								main
							</div>
						</Bootstrap_Row>
					</Bootstrap_Container>
				</div>
				<Footer>
					<NavItem>A</NavItem>
					<NavItem>B</NavItem>
					<NavItem>C</NavItem>
				</Footer>
				<div id="sideMenu" className="sideMenu-modal sideMenu-modal-hide" onClick={this.hideSideMenu}>
					<div id="sideMenu-box" style={{position:"absolute", backgroundColor:"white", width:"300px", top:"0", bottom:"0"}}>
						<SettingMenu />
						<div>{BuildInfo.VERSION}</div>
					</div>
				</div>
			</div>
		)
	}
});