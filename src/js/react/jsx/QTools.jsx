var React = require('react');
//var _Strage = require('./Contloller_Strage.js');
var _Login = require('./Controller_Login.js');
var InputAuthForm = require('./InputAuthForm.js');

module.exports = React.createClass({

	getInitialState: function() {
		var isWaitingStrage = _Login.Store.isWaitingStrage();
		var isValidAuthParam = _Login.Store.isValidAuthParam();
		var isChallengeLogin = _Login.Store.isChallengeLogin();
		var loginSuccess = _Login.Store.loginSuccess();

		return {
			showSplash:isWaitingStrage,
			showAuthInput:isValidAuthParam == false || loginSuccess == false,
			showLogining:isChallengeLogin == true,
			loginSuccess:loginSuccess
		};
	},

	componentDidMount: function() {
		var self = this;
		_Login.Store.addChangeStateListener(function () {
			console.log("addChangeStateListener");
			if (self.isMounted()) {
				var isWaitingStrage = _Login.Store.isWaitingStrage();
				var isValidAuthParam = _Login.Store.isValidAuthParam();
				var isChallengeLogin = _Login.Store.isChallengeLogin();
				var loginSuccess = _Login.Store.loginSuccess();

				self.setState({
					showSplash:isWaitingStrage,
					showAuthInput:isValidAuthParam == false || loginSuccess == false,
					showLogining:isChallengeLogin == true,
					loginSuccess:loginSuccess
				});
			};
		});
		/*
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
		*/
	},
	/*
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
	*/
	render: function() {
		if(this.state.showSplash){
			return (<div>splash</div>);

		}else if(this.state.showAuthInput){
			return (<InputAuthForm />);

		}else if(this.state.showLogining){
			return (<div>Login...</div>);

		}else if(this.state.sloginSuccess){
			return (<div>Login Success</div>);
		}
		return (<div>QTools</div>);
	}
});