'use strict';

var React = require('react');
var _Login = require('./Controller_Login.js');
var InputAuthForm = require('./InputAuthForm.js');
var Header = require('./Header.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

module.exports = React.createClass({
	displayName: 'exports',


	getInitialState: function getInitialState() {
		var isWaitingStrage = _Login.Store.isWaitingStrage();
		var isValidAuthParam = _Login.Store.isValidAuthParam();
		var isChallengeLogin = _Login.Store.isChallengeLogin();
		var loginSuccess = _Login.Store.loginSuccess();
		var changeAuth = _Login.Store.changeAuth();
		var loginedUser = _Login.Store.getLoginedUser();

		console.log(16, isValidAuthParam, loginSuccess, changeAuth);

		return {
			showSplash: isWaitingStrage,
			showAuthInput: isValidAuthParam == false || loginSuccess == false || changeAuth == true,
			showLogining: isChallengeLogin == true,
			loginSuccess: loginSuccess,
			loginedUser: loginedUser
		};
	},

	componentDidMount: function componentDidMount() {
		var self = this;
		_Login.Store.addChangeStateListener(function () {
			//console.log("addChangeStateListener");
			if (self.isMounted()) {
				var isWaitingStrage = _Login.Store.isWaitingStrage();
				var isValidAuthParam = _Login.Store.isValidAuthParam();
				var isChallengeLogin = _Login.Store.isChallengeLogin();
				var loginSuccess = _Login.Store.loginSuccess();
				var changeAuth = _Login.Store.changeAuth();
				var loginedUser = _Login.Store.getLoginedUser();

				console.log(37, isValidAuthParam, loginSuccess, changeAuth);

				self.setState({
					showSplash: isWaitingStrage,
					showAuthInput: isValidAuthParam == false || loginSuccess == false || changeAuth == true,
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
			return React.createElement(
				'div',
				{ className: 'height-fix', style: { display: "table" } },
				React.createElement(
					'div',
					{ className: 'height-fix', style: { display: "table-cell" } },
					React.createElement(
						Bootstrap_Container,
						null,
						React.createElement(
							Bootstrap_Row,
							null,
							React.createElement(
								Bootstrap_Col,
								null,
								React.createElement(InputAuthForm, null)
							)
						)
					)
				)
			);
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
				React.createElement(Header, null),
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
