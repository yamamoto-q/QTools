var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');

module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = this.props.list_style;
		if(typeof listStyle === "undefined" || !listStyle || listStyle.length == 0){
			listStyle = "minimum";
		}
		return {
			listStyle:listStyle
		};
	},
	render: function() {
		return(
			<ul className="list-group">
					{this.props.children}
			</ul>
		)
	}
});