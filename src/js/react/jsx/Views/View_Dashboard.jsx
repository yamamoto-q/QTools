var React = require('react');
var Header = require('./Header.js');

module.exports = React.createClass({
	render: function() {
		return(
			<div>
				<Header on_click_menu_icon={this.onClickMenuIcon}/>
				Dashboard
			</div>
		)
	}
});