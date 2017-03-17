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
		_QApi.Store.addOnGetAvaterListener(tqUserId, function () {
			if (self.isMounted()) {
				var avaterBlob = _QApi.Store.getAvater(qUserId);
				self.setState({
					blob: avaterBlob
				});
			}
		});

		_QApi.Action.getAvater(qUserId);
	},

	render: function render() {
		if (this.state.blob) {
			return React.createElement(
				'div',
				null,
				React.createElement('img', { src: this.state.blob })
			);
		} else {
			return React.createElement(
				'div',
				null,
				'?'
			);
		}
	}
});
