var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	componentDidMount: function() {
		// マウントされたとき
		Controller_View.Action.setHasFooter(true);
	},
	componentWillUnmount: function() {
		// アンマウントされるとき
		Controller_View.Action.setHasFooter(false);
	},
	render: function() {
		return (
			<div id="footer">{this.props.children}</div>
		);
	}
});