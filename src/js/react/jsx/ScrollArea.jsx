var React = require('react');
module.exports = React.createClass({
	render: function() {
		return (
			<div className="scroll-area">{this.props.children}</div>
		);
	}
});