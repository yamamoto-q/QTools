var React = require('react');

module.exports = React.createClass({
	render: function() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;

		return(
			<div className="row">
				<div className="col"></div>
				<div className="col">{allocatedNum}/{offeredNum}</div>
				<div className="col">{label}</div>
			</div>
		)
	}
});