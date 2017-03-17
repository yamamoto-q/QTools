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
		var self = this;

		_QApi.Store.addOnGetAvaterListener(this.state.qUserId, function () {
			if (self.isMounted()) {
				var avaterBlob = _QApi.Store.getAvater(self.state.qUserId);
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
				backgroundImage: "url(" + this.state.blob + ")"
			};
			return React.createElement('div', { className: 'avater', style: style });
		} else {
			return React.createElement('div', { className: 'avater' });
		}
	}
});
