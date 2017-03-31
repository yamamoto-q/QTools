var React = require('react');
var ScrollArea = require('./ScrollArea.js');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="col nav-items nav-items-v hidden-xs-down" style={{flexBasis:"210px", flexGrow: "0"}}>
				<ScrollArea>{this.props.children}</ScrollArea>
			</div>
		)
	}
});