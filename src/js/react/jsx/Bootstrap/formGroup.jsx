var React = require('react');
module.exports = React.createClass({
	render: function() {
		var classes = ["form-group"];
		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}
		return (
			<div className={classes.join(" ")}>
				{this.props.children}
			</div> 
		);
	}
});