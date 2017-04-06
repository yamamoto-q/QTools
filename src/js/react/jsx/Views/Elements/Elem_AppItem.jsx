var React = require('react');

module.exports = React.createClass({
	render: function() {
		var classes = [];
		if(this.props.className){
			classes = this.props.className.split(" ");
		}
		classes.push("row");
		classes.push("app-item");
		classes.push("app-item-view-minimum");

		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;
		var isStartable = this.props.app.startableActivitis.length > 0;
		var owner = this.props.app.processModelInfoCreateQuserName;
		var isActive = this.props.app.processModelInfoHasActiveProcessModel;

		var authorities = this.props.app.authorities || [];
		var isManager = authorities.indexOf("PROCESS_MODEL_MANAGER") != -1;


		// Star
		var starIcon = (<span className="icon icon-star_border"/>);
		if(isStarred){
			starIcon = (<span className="icon icon-star"/>);
			classes.push("app-item-stared");
		}

		var workItemNum = null;
		if(allocatedNum + offeredNum > 0){
			workItemNum = (<span className="badge badge-default badge-pill">{allocatedNum}/{offeredNum}</span>);
			classes.push("app-item-has-workitem");
		}

		var startableIcon = null;
		if(isStartable){
			startableIcon = (<span className="icon icon-move_to_inbox"/>);
			classes.push("app-item-is-startable");
		}

		//var disableIcon = null;
		if(!isActive){
			//disableIcon = (<span className="icon icon-close"/>);
			classes.push("app-item-deactive");
		}

		var managerIcon = null;
		if(isManager){
			managerIcon = (<span className="icon icon-face"/>);
			classes.push("app-item-manager");
		}

		return(
			<div className={classes.join(" ")}>
				<div className="col" style={{maxWidth:"16px"}}>{starIcon}</div>
				<div className="col">{workItemNum}{startableIcon}{managerIcon}</div>
				<div className="col app-item-label">{label}</div>
				<div className="col">{owner}</div>
			</div>
		)
	}
});