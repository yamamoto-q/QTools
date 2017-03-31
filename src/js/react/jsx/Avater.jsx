var React = require('react');
var _QApi = require('./Controller_Questetra_API.js');

module.exports = React.createClass({
	getInitialState: function() {
		var qUserId = this.props.quser_id;
		return {
			qUserId:qUserId,
			blob:null
		}
	},
	onGetAvater:function(){
		if (this.isMounted()) {
			var avaterBlob = _QApi.Store.getAvater(this.state.qUserId);
			this.setState({
				blob:avaterBlob
			});
		}
	},
	componentDidMount: function() {
		_QApi.Store.addOnGetAvaterListener(this.state.qUserId, this.onGetAvater);
		_QApi.Action.getAvater(this.state.qUserId);
	},
	componentWillUnmount:function(){
		_Login.Store.removeOnGetAvaterListener(this.state.qUserId, this.onGetAvater);
	},
	render: function() {
		if(this.state.blob){
			var style = {
				backgroundImage:"url("  + this.state.blob + ")"
			};
			return (<div className="avater" style={style} />);
		}else{
			return (<div className="avater" />);
		}
		
	}
});