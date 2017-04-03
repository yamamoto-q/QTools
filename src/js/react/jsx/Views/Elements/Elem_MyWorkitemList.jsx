var React = require('react');

var ListViewSwitcher = require('./Elem_ListViewSwitcher.js');

module.exports = React.createClass({
	getInitialState: function() {
		var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
		var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
		var workitems = allocatedWorkitems.concat(offeredWorkitems);
		return {
			allocatedWorkitems:allocatedWorkitems,
			offeredWorkitems:offeredWorkitems,
			workitems:workitems
		};
	},
	componentDidMount: function() {
		var self = this;

		_QApi.Store.addChangeAllocatedWorkitemsListener(function(){
			if (self.isMounted()) {
				var allocatedWorkitems = _QApi.Store.getAllocatedWorkitems();
				var workitems = allocatedWorkitems.concat(self.state.offeredWorkitems);
				self.setState({
					allocatedWorkitems:allocatedWorkitems,
					workitems:workitems
				});
				
			}
		});

		_QApi.Store.addChangeOfferedWorkitemsListener(function(){
			if (self.isMounted()) {
				var offeredWorkitems = _QApi.Store.getOfferedWorkitems();
				var workitems = self.state.offeredWorkitems.concat(offeredWorkitems);
				self.setState({
					offeredWorkitems:offeredWorkitems,
					workitems:workitems
				});
			}
		});

		_QApi.Action.getAllocatedWorkitems();
		_QApi.Action.getOfferedWorkitems();
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