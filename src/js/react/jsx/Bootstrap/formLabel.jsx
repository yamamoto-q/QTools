var React = require('react');
module.exports = React.createClass({
	render: function() {
		var classes = [];
		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}

		return (
			<label className={classes} htmlFor={this.props.htmlFor}>{this.props.label}</label>
		);
	}
});