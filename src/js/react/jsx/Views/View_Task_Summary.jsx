var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');

module.exports = React.createClass({
	componentDidMount: function() {
		var self = this;
		/*
		Controller_View.Store.addChangeViewListener(function () {
			if (self.isMounted()) {
				var viewName = Controller_View.Store.getViewNane();
				self.setState({
					viewName:viewName
				});
			};
		});
		*/
		_QApi.Action.getAllocatedTasks();
	},
	render: function() {
		return(
			<div className="card">
			  <div className="card-block">
			    <h4 className="card-title">View_Task_Summar</h4>
			    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			    <a href="#" className="btn btn-primary">Go somewhere</a>
			  </div>
			</div>
		)
	}
});