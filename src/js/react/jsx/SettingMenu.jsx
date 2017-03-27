var React = require('react');
var ReactRouter = require('react-router'); 
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	conClick:function(e){
		var viewName = e.target.getAttribute('data-viewname');
		console.log(viewName);
	},
	render: function() {
		return (
			<div className="list-group">
				<a href="#" className="list-group-item list-group-item-action" data-viewname={Controller_View.ViewNames.ADMIN_VIEW} onClick={this.conClick}>Admin Tools</a>
				<a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
				<a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
				<a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
				<a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
			</div>
		);
	}
});