var React = require('react');
module.exports = React.createClass({
	render: function() {

		var classes = [];

		if(typeof this.props.fluid !== "undefined" && !this.props.fluid && this.props.fluid == "false"){
			classes.push("container");
		}else{
			classes.push("container-fluid");
		}

		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}
		
		return (
			<div className={classes.join(" ")}>{this.props.children}</div>
		);
	}
});