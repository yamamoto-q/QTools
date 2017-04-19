/**
 * アプリ一覧の方法を変更するUI
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		var appSortType = Ctr_Strage.Store.getAppListFilterType();
		return {
			appSortType : appSortType
		}
	},
	onClick:function(e){
		var appSortType = e.currentTarget.getAttribute('data-sorttype');
		Ctr_Strage.Action.setAppListFilterType(appSortType);
	},
	onChanged:function(e){
		//console.log("onChanged");
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

		var manager_label_classes = ["btn", "btn-primary"];
		if(this.state.appSortType == Ctr_Strage.AppSortTypes.MANAGER){
			manager_label_classes.push("active");
		}

		var owner_label_classes = ["btn", "btn-primary"];
		if(this.state.appSortType == Ctr_Strage.AppSortTypes.OWNER){
			owner_label_classes.push("active");
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
				<label className={manager_label_classes.join(" ")} onClick={this.onClick} data-sorttype={Ctr_Strage.AppSortTypes.MANAGER}>
					<input type="radio" name="options" onChange={this.onChanged} checked={this.state.appSortType == Ctr_Strage.AppSortTypes.MANAGER}/>
					<span className={"icon icon-face"}/>
				</label>
				<label className={owner_label_classes.join(" ")} onClick={this.onClick} data-sorttype={Ctr_Strage.AppSortTypes.OWNER}>
					<input type="radio" name="options" onChange={this.onChanged} checked={this.state.appSortType == Ctr_Strage.AppSortTypes.OWNER}/>
					<span className={"icon icon-weekend"}/>
				</label>
			</div>
		);
	}
});