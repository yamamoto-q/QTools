var React = require('react');
module.exports = React.createClass({
	render: function() {
		var classes = ["form-control"];
		if(this.props.className){
			classes = classes.concat(this.props.className.split(" "));
		}

		// console.log(9, this.props.on_change);

		return (
			<input name={this.props.name} type={this.props.type} value={this.props.value} onChange={this.props.on_change} className={classes.join(" ")}/>
		);
	}
});