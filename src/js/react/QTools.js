'use strict';

var React = require('react');
//var _Strage = require('./Contloller_Strage.js');
var _Login = require('./Controller_Login.js');
var InputAuthForm = require('./InputAuthForm.js');

module.exports = React.createClass({
	displayName: 'exports',


	getInitialState: function getInitialState() {
		var isWaitingStrage = _Login.Store.isWaitingStrage();
		var isValidAuthParam = _Login.Store.isValidAuthParam();
		var isChallengeLogin = _Login.Store.isChallengeLogin();
		var loginSuccess = _Login.Store.loginSuccess();
		var loginedUser = _Login.Store.getLoginedUser();

		return {
			showSplash: isWaitingStrage,
			showAuthInput: isValidAuthParam == false || loginSuccess == false,
			showLogining: isChallengeLogin == true,
			loginSuccess: loginSuccess,
			loginedUser: loginedUser
		};
	},

	componentDidMount: function componentDidMount() {
		var self = this;
		_Login.Store.addChangeStateListener(function () {
			console.log("addChangeStateListener");
			if (self.isMounted()) {
				var isWaitingStrage = _Login.Store.isWaitingStrage();
				var isValidAuthParam = _Login.Store.isValidAuthParam();
				var isChallengeLogin = _Login.Store.isChallengeLogin();
				var loginSuccess = _Login.Store.loginSuccess();
				var loginedUser = _Login.Store.getLoginedUser();

				self.setState({
					showSplash: isWaitingStrage,
					showAuthInput: isValidAuthParam == false || loginSuccess == false,
					showLogining: isChallengeLogin == true,
					loginSuccess: loginSuccess,
					loginedUser: loginedUser
				});
			};
		});
	},
	render: function render() {
		if (this.state.showSplash) {
			return React.createElement(
				'div',
				null,
				'splash'
			);
		} else if (this.state.showAuthInput) {
			return React.createElement(InputAuthForm, null);
		} else if (this.state.showLogining) {
			return React.createElement(
				'div',
				null,
				'Login...'
			);
		} else if (this.state.loginSuccess) {
			return React.createElement(
				'div',
				null,
				'Login Success',
				React.createElement(
					'pre',
					null,
					JSON.stringify(this.state.loginedUser, null, 2)
				)
			);
		}
		return React.createElement(
			'div',
			null,
			'QTools'
		);
	}
});
