var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	render: function() {
		//console.log(this.state.workitem);
		var classes = [];
		if(this.props.className){
			classes = this.props.className.split(" ");
		}
		
		if(this.props.list_style == Ctr_Strage.ViewType.MINIMUM){
			classes.push("list-group-item");
			classes.push("justify-content-between");

			if(this.props.workitem.read){
				classes.push("workitem-readed");
			}else{
				classes.push("workitem-unread");
			}

			return(
				<li className={classe.join(" ")}>
					{this.props.workitem.nodeName}
					<span className="badge badge-default badge-pill">14</span>
				</li>
			);
		}

		return(
			<div>{JSON.stringify(this.props.workitem, null, 2)}</div>
		)
	}
});