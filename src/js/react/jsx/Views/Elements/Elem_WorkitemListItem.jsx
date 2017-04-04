var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			workitem : this.props.workitem,
		}
	},
	componentWillReceiveProps:function(nextProps){
		console.log(nextProps);
	},
	render: function() {
		//console.log(this.state.workitem);
		
		if(this.props.list_style == Ctr_Strage.ViewType.MINIMUM){
			return(
				<li className="list-group-item justify-content-between">
					{this.state.workitem.nodeName}
					<span className="badge badge-default badge-pill">14</span>
				</li>
			);
		}

		return(
			<div>{JSON.stringify(this.state.workitem, null, 2)}</div>
		)
	}
});