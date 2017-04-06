var React = require('react');

module.exports = React.createClass({
	render: function() {
		var label = this.props.app.processModelInfoName;
		var isStarred = this.props.app.starred;
		var allocatedNum = this.props.app.allocatedWorkitems.length;
		var offeredNum = this.props.app.offeredWorkitems.length;

		return(
			<div>{label}:{isStarred}/{allocatedNum}/{offeredNum}</div>
		)
	}
});