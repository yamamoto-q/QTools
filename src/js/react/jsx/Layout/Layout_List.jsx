var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');

var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = this.props.list_style;
		return {
			listStyle:listStyle
		};
	},
	render: function() {
		var classes = [];
		if(this.props.className){
			classes = this.props.className.split(" ");
		} 
		classes.push("layout-list");
		classes.push("layout-list-" + this.props.list_style);

		if(this.props.list_style == Ctr_Strage.ViewType.MINIMUM){
			classes.push("list-group");
			return(
				<ul className={classes.join(" ")}>{this.props.children}</ul>
			);
		}

		return(
			<div>{this.props.children}</div>
		)
	}
});