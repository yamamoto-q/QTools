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

	componentDidMount: function() {
		var qUserId = this.props.quser_id;

		var self = this;
		_QApi.Store.addOnGetAvaterListener(this.state.qUserId, function(){
			console.log(18, "addOnGetAvaterListener");
			if (self.isMounted()) {
				var avaterBlob = _QApi.Store.getAvater(self.state.qUserId);
				console.log(18, avaterBlob);

				self.setState({
					blob:avaterBlob
				});
			}
		});

		_QApi.Action.getAvater(this.state.qUserId);
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