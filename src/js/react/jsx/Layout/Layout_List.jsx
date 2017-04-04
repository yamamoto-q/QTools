var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');

var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = this.props.list_style;
		if(typeof listStyle === "undefined" || !listStyle || listStyle.length == 0){
			listStyle = Ctr_Strage.ViewType.MINIMUM;
		}
		return {
			listStyle:listStyle
		};
	},
	render: function() {
		if(this.state.listStyle == Ctr_Strage.ViewType.MINIMUM){
			return(
				<ul className="list-group">{this.props.children}</ul>
			);
		}

		return(
			<div>{this.props.children}</div>
		)
	}
});