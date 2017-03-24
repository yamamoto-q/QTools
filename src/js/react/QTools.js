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
			$("body").removeClass('authentication').removeClass('logining').removeClass('logined').addClass('splash');

			return React.createElement(
				'div',
				null,
				'splash'
			);
		} else if (this.state.showAuthInput) {
			$("body").removeClass('logining').removeClass('logined').removeClass('splash').addClass('authentication');

			return React.createElement(
				'div',
				{ className: 'height-fix', style: { display: "table", width: "100%" } },
				React.createElement(
					'div',
					{ className: 'height-fix', style: { display: "table-cell", verticalAlign: "middle" } },
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
			$("body").removeClass('authentication').removeClass('logined').removeClass('splash').addClass('logining');

			return React.createElement(
				'div',
				null,
				'Login...'
			);
		} else if (this.state.loginSuccess) {
			$("body").removeClass('authentication').removeClass('logining').removeClass('splash').addClass('logined');

			return React.createElement(
				'div',
				{ className: 'height-fix' },
				React.createElement(Header, null),
				React.createElement(
					'pre',
					null,
					JSON.stringify(this.state.loginedUser, null, 2)
				),
				React.createElement(
					'div',
					{ style: { position: "absolute", backgroundColor: "rgba(0,0,0,0.5)", right: "0", top: "0", left: "0", bottom: "0", zIndex: "999" } },
					React.createElement(
						'div',
						{ style: { position: "absolute", backgroundColor: "white", width: "300px", top: "0", left: "0", bottom: "0" } },
						'hoge'
					)
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
