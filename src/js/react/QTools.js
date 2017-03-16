'use strict';

var React = require('react');
var _Strage = require('./Contloller_Strage.js');
var InputAuthForm = require('./InputAuthForm.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			isStrageWait: true,
			isChallengeLogin: false,
			auth: null
		};
	},
	componentDidMount: function componentDidMount() {
		var self = this;

		_Strage.Store.addGetAuthenticationListener(function () {
			// 認証情報のロードが完了したとき
			if (self.isMounted()) {
				var auth = _Strage.Store.getAuthState();

				setTimeout(function () {
					self.setState({
						isStrageWait: false,
						auth: auth
					});

					// 認証にチャレンジ
					self.challengeLogin();
				}, 500);
			};
		});

		_Strage.Store.addChangeAuthenticationListener(function () {
			// 認証情報のロードが変更された時
			if (self.isMounted()) {
				var auth = _Strage.Store.getAuthState();
				self.setState({
					auth: auth
				});

				// 認証にチャレンジ
				setTimeout(function () {
					self.challengeLogin();
				}, 500);
			};
		});

		_Strage.Action.getAuthentication();
	},
	challengeLogin: function challengeLogin() {
		// 認証にチャレンジする
		if (this.isMounted()) {
			this.setState({
				isChallengeLogin: true
			});
			var context_path = this.state.auth.context_path;
			var email = this.state.auth.email;
			var api_password = this.state.auth.api_password;
			console.log("challengeLogin", context_path, email, api_password);
		};
	},

	render: function render() {
		if (this.state.isStrageWait) {
			// Strage 待ち
			return React.createElement(
				'div',
				null,
				'Splash'
			);
		} else if (!this.state.auth) {
			// 認証情報無し
			return React.createElement(InputAuthForm, null);
		} else if (this.state.isChallengeLogin) {
			// 認証情報あり 認証チャレンジ中
			return React.createElement(
				'div',
				null,
				'isChallengeLogin'
			);
		} else {
			// Logined
			return React.createElement(
				'div',
				null,
				'Logined'
			);
		}
	}
});
