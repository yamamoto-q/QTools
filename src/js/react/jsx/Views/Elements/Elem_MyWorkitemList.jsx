var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	getInitialState: function() {
		var workitems = Ctr_QApi.Store.getWorkitems();
		return {
			workitems:workitems
		};
	},
	componentDidMount: function() {
		var self = this;

		Ctr_QApi.Store.addChangeWorkitemsListener(function(){
			if (self.isMounted()) {
				var workitems = Ctr_QApi.Store.getWorkitems();
				self.setState({
					workitems:workitems
				});
			}
		});

		Ctr_QApi.Action.startCheckWorkItems();
	},
	render: function() {
		console.log(this.state.workitems);
		return (
			<div className="scroll-area">
				<ListViewSwitcher />
				Elem_MyWorkitemList
			</div>
		);
	}
});