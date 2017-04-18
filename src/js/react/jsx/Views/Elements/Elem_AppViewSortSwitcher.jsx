var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		var appSortType = Ctr_Strage.Store.getAppListViewSortType();
		return {
			appSortType : appSortType
		}
	},
	onClick:function(e){
		var appSortType = e.currentTarget.getAttribute('data-sorttype');
		console.log("onClick:" + appSortType);
		//Ctr_Strage.Action.setMyWorkitemListViewType(listType);
	},
	onChanged:function(e){
		console.log("onChanged");
	},
	render: function() {
		var ai_label_classes = ["btn", "btn-primary"];
		if(this.state.appSortType == Ctr_Strage.AppSortTypes.AI){
			ai_label_classes.push("active");
		}

		var startable_label_classes = ["btn", "btn-primary"];
		if(this.state.appSortType == Ctr_Strage.AppSortTypes.STARTABLE){
			startable_label_classes.push("active");
		}

		return (
			<div className="btn-group" data-toggle="buttons">
				<label className={ai_label_classes.join(" ")} onClick={this.onClick} data-sorttype={Ctr_Strage.AppSortTypes.AI}>
					<input type="radio" name="options" onChange={this.onChanged} checked={this.state.appSortType == Ctr_Strage.AppSortTypes.AI}/>
					AI
				</label>
				<label className={startable_label_classes.join(" ")} onClick={this.onClick} data-sorttype={Ctr_Strage.AppSortTypes.STARTABLE}>
					<input type="radio" name="options" onChange={this.onChanged} checked={this.state.appSortType == Ctr_Strage.AppSortTypes.STARTABLE}/>
					<span className={"icon icon-move_to_inbox"}/>
				</label>
			</div>
		);
	}
});