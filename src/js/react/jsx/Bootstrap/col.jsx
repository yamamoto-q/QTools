var React = require('react');
module.exports = React.createClass({
	render: function() {

		var classes = [];

		if(typeof this.props.sm !== "undefined"){
			classes.push("col-sm-" + this.props.sm);
		}else{
			classes.push("col-sm-12");
		}

		if(typeof this.props.md !== "undefined"){
			classes.push("col-md-" + this.props.md);
		}else{
			classes.push("col-md-12");
		}

		if(typeof this.props.lg !== "undefined"){
			classes.push("col-lg-" + this.props.lg);
		}else{
			classes.push("col-lg-12");
		}

		if(typeof this.props.xl !== "undefined"){
			classes.push("col-xl-" + this.props.xl);
		}else{
			classes.push("col-xl-12");
		}

		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}
		
		return (
			<div className={classes.join(" ")}>{this.props.children}</div>
		);
	}
});