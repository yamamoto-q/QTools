var React = require('react');
var _Login = require('./Controller_Login.js');
var Bootstrap_FormGroup = require('./Bootstrap_FormGroup.js');
var Bootstrap_FormLabel = require('./Bootstrap_FormLabel.js');
var Bootstrap_FormInput = require('./Bootstrap_FormInput.js');


module.exports = React.createClass({
	getInitialState: function() {
		var auth = _Login.Store.getAuth();

		if(auth){
			return {
				context_path:auth.context_path || "",
				email:auth.email || "",
				api_password:auth.api_password || ""
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
		//console.log(this.state);
		_Login.Action.setAuth(this.state.context_path, this.state.email, this.state.api_password);
	},
	render: function() {
		return (
			<div>
				<Bootstrap_FormGroup>
					<Bootstrap_FormLabel htmlFor="inputContextPath" label="Context Path" />
					<Bootstrap_FormInput name="inputContextPath" type="text" value={this.state.context_path} on_change={this.onChangeContext}/>
				</Bootstrap_FormGroup>
				<Bootstrap_FormGroup>
					<Bootstrap_FormLabel htmlFor="inputEmail" label="Email" />
					<Bootstrap_FormInput name="inputEmail" type="email" value={this.state.email} on_change={this.onChangeEmail}/>
				</Bootstrap_FormGroup>
				<Bootstrap_FormGroup>
					<Bootstrap_FormLabel htmlFor="inputPwd" label="API Password" />
					<Bootstrap_FormInput name="inputPwd" type="password" value={this.state.api_password} on_change={this.onChangePassword}/>
				</Bootstrap_FormGroup>
				<button type="button" onClick={this.onClickLoginBtn}>Login</button>
			</div>
		)
	}
});