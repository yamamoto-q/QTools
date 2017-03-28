var React = require('react');
var _Login = require('./Controller_Login.js');
var _QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');
var Avater = require('./Avater.js');

module.exports = React.createClass({
	getInitialState: function() {
		var loginedUser = _Login.Store.getLoginedUser();

		_QApi.Action.getAvater(loginedUser.id);

		return {
			id:loginedUser.id,
			mail:loginedUser.mail,
			name:loginedUser.name
		}
	},
	componentDidMount: function() {
		// マウントされたとき
		Controller_View.Action.setHasHeader(true);
	},
	componentWillUnmount: function() {
		// アンマウントされるとき
		Controller_View.Action.setHasHeader(false);
	},
	onClickMenuIcon:function(e){
		e.preventDefault();
		this.props.on_click_menu_icon();
	},
	onClickLogout:function(){
		_Login.Action.logout();
	},
	render: function() {
		return (
			<div id="header">
				<div className="bar-left">
					<div className="bar-item"><span className="icon icon-menu" onClick={this.onClickMenuIcon}></span></div>
				</div>
				<div className="bar-right">
					<div className="bar-item dropdown">
						<div data-toggle="dropdown"><Avater quser_id={this.state.id} /></div>
						<div className="dropdown-menu dropdown-menu-right">
							<h6 className="dropdown-header">{this.state.name}</h6>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" onClick={this.onClickLogout}>Logout</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
});