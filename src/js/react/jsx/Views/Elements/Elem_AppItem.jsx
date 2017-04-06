var React = require('react');

module.exports = React.createClass({
	render: function() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;
		var isStartable = this.props.app.startableActivitis.length > 0;
		var owner = this.props.app.processModelInfoCreateQuserName;

		// Star
		var starIcon = (<span className="icon icon-star_border"/>);
		if(isStarred){
			starIcon = (<span className="icon icon-star"/>);
		}

		var workItemNum = null;
		if(allocatedNum + offeredNum > 0){
			workItemNum = (<span className="badge badge-default badge-pill">{allocatedNum}/{offeredNum}</span>);
		}

		var startableIcon = null;
		if(isStartable){
			startableIcon = (<span className="icon-move_to_inbox"/>);
		}

		return(
			<div className="row">
				<div className="col" style={{maxWidth:"16px"}}>{starIcon}</div>
				<div className="col">{workItemNum}{startableIcon}</div>
				<div className="col">{label}</div>
				<div className="col">{owner}</div>
			</div>
		)
	}
});