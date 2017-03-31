var React = require('react');
var ScrollArea = require('./ScrollArea.js');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="col">
				<ScrollArea>{this.props.children}</ScrollArea>
			</div>
		)
	}
});