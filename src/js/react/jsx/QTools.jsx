var React = require('react');
var _Strage = require('./Contloller_Strage.js');
var InputAuthForm = require('./InputAuthForm.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			isStrageWait:true,
			isChallengeLogin:false,
			auth: null
		};
	},
	componentDidMount: function() {
		var self = this;

		_Strage.Store.addGetAuthenticationListener(function () {
			// 認証情報のロードが完了したとき
			if (self.isMounted()) {
				var auth = _Strage.Store.getAuthState();

				setTimeout(function(){
					self.setState({
						isStrageWait:false,
						auth: auth
					});

					// 認証にチャレンジ
					self.challengeLogin();
				}, 500);
			};
		});

		_Strage.Store.addChangeAuthenticationListener(function(){
			// 認証情報のロードが変更された時
			if (self.isMounted()) {
				var auth = _Strage.Store.getAuthState();
				self.setState({
					auth: auth
				});

				// 認証にチャレンジ
				setTimeout(function(){
					self.challengeLogin();
				}, 500);
			};
		});

		_Strage.Action.getAuthentication();
	},
	challengeLogin(){
		// 認証にチャレンジする
		if (this.isMounted()) {
			this.setState({
					isChallengeLogin:true
			});
			var context_path = this.state.auth.context_path;
			var email = this.state.auth.email;
			var api_password = this.state.auth.api_password;
			console.log("challengeLogin", context_path, email, api_password);
		};
	},
	render: function() {
		if(this.state.isStrageWait){
			// Strage 待ち
			return (
				<div>Splash</div>
			);
		}else if(!this.state.auth){
			// 認証情報無し
			return (
				<InputAuthForm />
			);
		}else if(this.state.isChallengeLogin){
			// 認証情報あり 認証チャレンジ中
			return (
				<div>isChallengeLogin</div>
			);
		}else{
			// Logined
			return (
				<div>Logined</div>
			);
		}

	}
});