var React = require('react');
var Header = require('./Header.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			sidemenuIsVisible:false
		}
	},
	onClickMenuIcon:function(){
		console.log("onClickMenuIcon");
		this.setState({
			sidemenuIsVisible:true
		});
	},

	render: function() {
		var modalClasses = ["sideMenu-modal"];
		if(this.state.sidemenuIsVisible){
			modalClasses.push("sideMenu-modal-show");
		}else{
			modalClasses.push("sideMenu-modal-hide");
		}
		var modalStyle = {
			position:"absolute", backgroundColor:"rgba(0,0,0,0.5)", right:"0", top:"0", left:"0", bottom:"0", zIndex:"999"
		};

		return (
			<div className="height-fix">
				<Header on_click_menu_icon={this.onClickMenuIcon}/>
				<pre>Logined</pre>
				<div id="sideMenu" className={modalClasses.join(" ")} style={modalStyle}>
					<div style={{position:"absolute", backgroundColor:"white", width:"300px", top:"0", left:"0", bottom:"0"}}>
						hoge
						35:{JSON.stringify(this.state, null, 2)}
					</div>
				</div>
			</div>
		);
	}
});