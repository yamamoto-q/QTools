var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');
var SettingMenu = require('./SettingMenu.js');



var ToDo = require('./ToDo.js');

var ReactRouter = require('react-router'); 
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var routes = (
  <Route path="/" component={ToDo}>
    <IndexRoute component={ToDo}/>
    <Route path="*" component={ToDo}/>
  </Route>
);

module.exports = React.createClass({
	onClickMenuIcon:function(){
		$("#sideMenu #sideMenu-box")
			.css("left":"-300px");
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
		return (
			<div className="height-fix">
				<Header on_click_menu_icon={this.onClickMenuIcon}/>
				<routes/>
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

