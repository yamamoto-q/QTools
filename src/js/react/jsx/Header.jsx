var React = require('react');
var _Login = require('./Controller_Login.js');
var _QApi = require('./Controller_Questetra_API.js');

module.exports = React.createClass({
	getInitialState: function() {
		var loginedUser = _Login.Store.getLoginedUser();

		_QApi.Action.getAvater(loginedUser.id);

		return {
			id:loginedUser.id,
			mail:loginedUser.mail,
			name:loginedUser.name
		}
	},

	componentDidMount: function() {
		var self = this;
		_QApi.Store.addOnGetAvaterListener(this.state.id, function(){
			console.log("addOnGetAvaterListener");
			var avaterBlob = getAvater(self.state.id);
			console.log(avaterBlob);
		});
	},
	

	render: function() {
		return (<div>header {this.state.name}</div>);
	}
});