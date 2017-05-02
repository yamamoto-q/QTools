var React = require('react');

module.exports = React.createClass({
	render: function() {
		var classes = ["badge"];
		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}

		if(this.props.appearance){
			classes.push("badge-" + this.props.appearance);
		}

		return (
			<div className={classes.join(" ")}>
				{this.props.children}
			</div>
		);
	}
});