var React = require('react');
module.exports = React.createClass({
	render: function() {
		var classes = ["form-group"];
		if(typeof this.ptops.className !== "undefined"){
			classes = classes.concat(this.ptops.className.split(" "));
		}
		return (
			<div className={classes.join(" ")}>
				{this.props.children}
			</div> 
		);
	}
});