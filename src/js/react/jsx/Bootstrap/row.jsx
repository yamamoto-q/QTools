var React = require('react');
module.exports = React.createClass({
	render: function() {
		var classes = ["row"];
		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}

		var style = {};
		if(typeof this.props.wrap !== "undefined" && (!this.props.wrap || this.props.wrap == "false")){
			style.flexWrap = "nowrap";
		}
		
		return (
			<div className={classes.join(" ")} style={style}>{this.props.children}</div>
		);
	}
});