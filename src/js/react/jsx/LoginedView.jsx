var React = require('react');
var Header = require('./Header.js');
var BuildInfo = require('./BuildInfo.js');

module.exports = React.createClass({
	onClickMenuIcon:function(){
		$("#sideMenu.sideMenu-modal").show(0,function(){
			$(this).animate({
				backgroundColor: "rgba(0,0,0,0.5)",
			},1000, function() {

			});
		})
	},
	hideSideMenu:function(){
		$("#sideMenu.sideMenu-modal").hide(1000).removeClass("sideMenu-modal-show").addClass("sideMenu-modal-hide");
	},
	render: function() {
		return (
			<div className="height-fix">
				<Header on_click_menu_icon={this.onClickMenuIcon}/>
				<pre>Logined</pre>
				<div id="sideMenu" className="sideMenu-modal sideMenu-modal-hide" onClick={this.hideSideMenu}>
					<div style={{position:"absolute", backgroundColor:"white", width:"300px", top:"0", left:"0", bottom:"0"}}>
						hoge
						35:{JSON.stringify(this.state, null, 2)}
						<div>{BuildInfo.VERSION}</div>
					</div>
				</div>
			</div>
		);
	}
});