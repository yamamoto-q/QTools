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
	onGetAvater: function onGetAvater() {
		if (this.isMounted()) {
			var avaterBlob = _QApi.Store.getAvater(this.state.qUserId);
			this.setState({
				blob: avaterBlob
			});
		}
	},
	componentDidMount: function componentDidMount() {
		_QApi.Store.addOnGetAvaterListener(this.state.qUserId, this.onGetAvater);
		_QApi.Action.getAvater(this.state.qUserId);
	},
	componentWillUnmount: function componentWillUnmount() {
		_QApi.Store.removeOnGetAvaterListener(this.state.qUserId, this.onGetAvater);
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
