'use strict';

var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var qUserId = this.props.quser_id;
		return {
			qUserId: qUserId,
			blob: null
		};
	},

	componentDidMount: function componentDidMount() {
		var qUserId = this.props.quser_id;

		var self = this;
		_QApi.Store.addOnGetAvaterListener(this.state.qUserId, function () {
			console.log(18, "addOnGetAvaterListener");
			if (self.isMounted()) {
				var avaterBlob = _QApi.Store.getAvater(self.state.qUserId);
				console.log(18, avaterBlob);

				self.setState({
					blob: avaterBlob
				});
			}
		});

		_QApi.Action.getAvater(this.state.qUserId);
	},

	render: function render() {
		if (this.state.blob) {
			var style = {
				backgroundImage: this.state.blob
			};
			return React.createElement('div', { className: 'avater', style: style });
		} else {
			return React.createElement('div', { className: 'avater' });
		}
	}
});
