var React = require('react');
var _Login = require('./Controller_Login.js');
var InputAuthForm = require('./InputAuthForm.js');
var Header = require('./Header.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

module.exports = React.createClass({

	getInitialState: function() {
		var isWaitingStrage = _Login.Store.isWaitingStrage();
		var isValidAuthParam = _Login.Store.isValidAuthParam();
		var isChallengeLogin = _Login.Store.isChallengeLogin();
		var loginSuccess = _Login.Store.loginSuccess();
		var changeAuth = _Login.Store.changeAuth();
		var loginedUser = _Login.Store.getLoginedUser();

		console.log(16, isValidAuthParam, loginSuccess, changeAuth);

		return {
			showSplash:isWaitingStrage,
			showAuthInput:isValidAuthParam == false || loginSuccess == false || changeAuth == true,
			showLogining:isChallengeLogin == true,
			loginSuccess:loginSuccess,
			loginedUser:loginedUser
		};
	},

	componentDidMount: function() {
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
					showSplash:isWaitingStrage,
					showAuthInput:isValidAuthParam == false || loginSuccess == false || changeAuth == true,
					showLogining:isChallengeLogin == true,
					loginSuccess:loginSuccess,
					loginedUser:loginedUser
				});


			};
		});
	},
	render: function() {
		if(this.state.showSplash){
			return (<div>splash</div>);

		}else if(this.state.showAuthInput){
			return (
				<Bootstrap_Container className="height-fix">
					<Bootstrap_Row className="height-fix">
						<Bootstrap_Col className="height-fix">
							<InputAuthForm />
						</Bootstrap_Col>
					</Bootstrap_Row>
				</Bootstrap_Container>
			);

		}else if(this.state.showLogining){
			return (<div>Login...</div>);

		}else if(this.state.loginSuccess){
			return (
				<div>
					<Header/>
					<pre>{JSON.stringify(this.state.loginedUser, null, 2)}</pre>
				</div>
				);
		}
		return (<div>QTools</div>);
	}
});