var React = require('react');
module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = this.props.list_style;
		if(typeof listStyle === "undefined" || !listStyle || listStyle.length == 0){
			listStyle = Ctr_Strage.ViewType.MINIMUM;
		}

		return {
			workitem : this.props.workitem,
			listStyle : listStyle
		}
	},
	render: function() {
		if(this.state.listStyle == Ctr_Strage.ViewType.MINIMUM){
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