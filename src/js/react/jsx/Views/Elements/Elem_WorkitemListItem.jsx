var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	render: function() {
		//console.log(this.state.workitem);
		var classes = [];
		if(this.props.className){
			classes = this.props.className.split(" ");
		}

		classes.push("workitem");

		// 既読Style
		if(this.props.workitem.read){
			classes.push("workitem-readed");
		}else{
			classes.push("workitem-unread");
		}
		
		if(this.props.list_style == Ctr_Strage.ViewType.MINIMUM){
			classes.push("list-group-item");
			//classes.push("justify-content-between");

			return(
				<li className={classes.join(" ")}>
					{this.props.processInstanceTitle}
				</li>
			);
		}else if(this.props.list_style == Ctr_Strage.ViewType.CARD){
			classes.push("card");
			return(
				<div className={classes.join(" ")}>
					<div className="card-block">
						<h4 className="card-title">{this.props.processInstanceTitle}</h4>
						<p className="card-text">{JSON.stringify(this.props.workitem, null, 2)}</p>
					</div>
				</div>
			);
		}

		return(
			<div>{JSON.stringify(this.props.workitem, null, 2)}</div>
		)
	}
});