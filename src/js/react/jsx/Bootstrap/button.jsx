var React = require('react');
module.exports = React.createClass({
	render: function() {
		var classes = ["btn"];
		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}

		return (
			<button type="button" onClick={this.props.on_click} className={classes.join(" ")}>{this.props.label}</button>
		);
	}
});