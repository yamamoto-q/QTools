var React = require('react');
var Ctr_QApi = require('./Controller_Questetra_API.js');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	getInitialState: function() {
		var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
		var workitems = allocatedWorkitems.concat(offeredWorkitems);
		return {
			allocatedWorkitems:allocatedWorkitems,
			offeredWorkitems:offeredWorkitems,
			workitems:workitems
		};
	},
	componentDidMount: function() {
		var self = this;

		Ctr_QApi.Store.addChangeAllocatedWorkitemsListener(function(){
			if (self.isMounted()) {
				var allocatedWorkitems = Ctr_QApi.Store.getAllocatedWorkitems();
				var workitems = allocatedWorkitems.concat(self.state.offeredWorkitems);
				self.setState({
					allocatedWorkitems:allocatedWorkitems,
					workitems:workitems
				});
				
			}
		});

		Ctr_QApi.Store.addChangeOfferedWorkitemsListener(function(){
			if (self.isMounted()) {
				var offeredWorkitems = Ctr_QApi.Store.getOfferedWorkitems();
				var workitems = self.state.offeredWorkitems.concat(offeredWorkitems);
				self.setState({
					offeredWorkitems:offeredWorkitems,
					workitems:workitems
				});
			}
		});

		_QApi.Action.startCheckWorkItems();
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