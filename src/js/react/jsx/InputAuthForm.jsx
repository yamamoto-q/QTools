var React = require('react');
var _Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		var auth = _Strage.Store.getAuthState();

		if(auth){
			return {
				context_path:auth.context_path,
				email:auth.email,
				api_password:auth.api_password
			}
		}else{
			return {
				context_path:"",
				email:"",
				api_password:""
			}
		}
	},
	onChangeContext:function(e){
		var context = e.target.value;
		this.setState({
			context_path:context
		});
	},
	onChangeEmail:function(e){
		var email = e.target.value;
		this.setState({
			email:email
		});
	},
	onChangePassword:function(e){
		var pwd = e.target.value;
		this.setState({
			api_password:pwd
		});
	},
	onClickLoginBtn:function(e){
		console.log(this.state);
		_Strage.Action.setAuthentication(this.state.context_path, this.state.email, this.state.api_password);
	},
	render: function() {
		return (
			<div>
				<input type="text" value={this.state.context_path} onChange={this.onChangeContext} />
				<input type="email" value={this.state.email} onChange={this.onChangeEmail} />
				<input type="password" value={this.state.api_password} onChange={this.onChangePassword} />
				<button type="button" onClick={this.onClickLoginBtn}>Login</button>
			</div>
		)

	}
});