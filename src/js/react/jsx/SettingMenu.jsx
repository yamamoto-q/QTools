var React = require('react');
var ReactRouter = require('react-router'); 

var _Login = require('./Controller_Login.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	getInitialState: function() {
		var permission = _Login.Store.getPermission()
		return {
			permission:permission
		};
	},
	componentDidMount: function() {
		var self = this;
		_Login.Store.addChangePermissionListener(function () {
			if (self.isMounted()) {
				var permission = _Login.Store.getPermission();
				self.setState({
					permission:permission
				});
			}
		});
	},
	conClick:function(e){
		var viewName = e.target.getAttribute('data-viewname');
		Controller_View.Action.setView(viewName);
	},
	render: function() {
		return (
			<div className="list-group">
				<a href="#" className="list-group-item list-group-item-action" data-viewname={Controller_View.ViewNames.ADMIN_TOOLS} onClick={this.conClick}>Admin Tools</a>
				<a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
				<a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
				<a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
				<a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
				<pre>{JSON.stringify(this.state.permission, null, 2)}</pre>
			</div>
		);
	}
});