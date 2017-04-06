var React = require('react');

module.exports = React.createClass({
	render: function() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;

		// Star
		var starIcon = (<span className="icon icon-star_border"/>);
		if(isStarred){
			starIcon = (<span className="icon icon-star"/>);
		}

		var workItemNum = null;
		if(allocatedNum + offeredNum > 0){
			workItemNum = (<span className="badge badge-default badge-pill">{allocatedNum}/{offeredNum}</span>);
		}

		return(
			<div className="row">
				<div className="col">{starIcon}</div>
				<div className="col">{workItemNum}</div>
				<div className="col">{label}</div>
			</div>
		)
	}
});