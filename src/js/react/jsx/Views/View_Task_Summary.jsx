var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	getInitialState: function() {
		var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
		return {
			allocatedWorkitems:allocatedWorkitems,
			offeredWorkitems:offeredWorkitems
		};
	},
	componentDidMount: function() {
		var self = this;

		_QApi.Store.addChangeAllocatedWorkitemsListener(function(){
			if (self.isMounted()) {
				var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
				self.setState({
					allocatedWorkitems:allocatedWorkitems
				});
				
			}
		});

		_QApi.Store.addChangeOfferedWorkitemsListener(function(){
			if (self.isMounted()) {
				var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
				self.setState({
					offeredWorkitems:offeredWorkitems
				});
			}
		});

		_QApi.Action.getAllocatedWorkitems();
		_QApi.Action.getOfferedWorkitems();
	},
	onClick:function(e){
		
		var viewName = e.target.getAttribute('data-viewname');
		e.preventDefault();
		
		console.log(viewName);
		Controller_View.Action.setView(viewName);
	},
	render: function() {
		return(
			<div className="card" onClick={this.onClick} data-viewname={Controller_View.ViewNames.ADMIN_TOOLS}>
				<div className="card-block">
					<h4 className="card-title">Work!</h4>
					<p className="card-text">Hoge</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">allocatedWorkitems {this.state.allocatedWorkitems.length}</li>
					<li className="list-group-item">offeredWorkitems {this.state.offeredWorkitems.length}</li>
				</ul>
			</div>
		)
	}
});