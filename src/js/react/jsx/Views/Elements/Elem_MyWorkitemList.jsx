var React = require('react');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="scroll-area">
				<ListViewSwitcher />
				Elem_MyWorkitemList
			</div>
		);
	}
});