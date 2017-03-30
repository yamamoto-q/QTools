var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');

module.exports = React.createClass({
	getInitialState: function() {
		var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
		return {
			allocatedWorkitems:allocatedWorkitems
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
		_QApi.Action.getAllocatedWorkitems();
	},
	render: function() {
		return(
			<div className="card">
				<div className="card-block">
					<h4 className="card-title">View_Task_Summar</h4>
					<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<a href="#" className="btn btn-primary">Go somewhere</a>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Cras justo odio {this.state.allocatedWorkitems.length}</li>
				</ul>
			</div>
		)
	}
});