'use strict';

var React = require('react');
var _Login = require('./Controller_Login.js');
var Bootstrap_FormGroup = require('./Bootstrap_FormGroup.js');
var Bootstrap_FormLabel = require('./Bootstrap_FormLabel.js');
var Bootstrap_FormInput = require('./Bootstrap_FormInput.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var auth = _Login.Store.getAuth();

		if (auth) {
			return {
				context_path: auth.context_path || "",
				email: auth.email || "",
				api_password: auth.api_password || ""
			};
		} else {
			return {
				context_path: "",
				email: "",
				api_password: ""
			};
		}
	},
	onChangeContext: function onChangeContext(e) {
		var context = e.target.value;
		this.setState({
			context_path: context
		});
	},
	onChangeEmail: function onChangeEmail(e) {
		var email = e.target.value;
		this.setState({
			email: email
		});
	},
	onChangePassword: function onChangePassword(e) {
		var pwd = e.target.value;
		this.setState({
			api_password: pwd
		});
	},
	onClickLoginBtn: function onClickLoginBtn(e) {
		//console.log(this.state);
		_Login.Action.setAuth(this.state.context_path, this.state.email, this.state.api_password);
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				Bootstrap_FormGroup,
				null,
				React.createElement(Bootstrap_FormLabel, { htmlFor: 'inputContextPath', label: 'Context Path' }),
				React.createElement(Bootstrap_FormInput, { name: 'inputContextPath', type: 'text', value: this.state.context_path, onChange: this.onChangeContext })
			),
			React.createElement(
				Bootstrap_FormGroup,
				null,
				React.createElement(Bootstrap_FormLabel, { htmlFor: 'inputEmail', label: 'Email' }),
				React.createElement(Bootstrap_FormInput, { name: 'inputEmail', type: 'email', value: this.state.email, onChange: this.onChangeEmail })
			),
			React.createElement('input', { type: 'password', value: this.state.api_password, onChange: this.onChangePassword }),
			React.createElement(
				'button',
				{ type: 'button', onClick: this.onClickLoginBtn },
				'Login'
			)
		);
	}
});
