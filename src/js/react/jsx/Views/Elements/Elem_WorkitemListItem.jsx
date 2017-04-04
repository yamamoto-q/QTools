var React = require('react');
module.exports = React.createClass({
	getInitialState: function() {
		return {
			workitem : this.props.workitem,
			listStyle : this.props.list_style
		}
	},
	render: function() {
		return (
			<li className="list-group-item justify-content-between">
				{this.state.workitem.nodeName}
				<span className="badge badge-default badge-pill">14</span>
			</li>
		);
	}
});