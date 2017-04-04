var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');

module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = Ctr_Strage.Store.getMyWorkitemListViewType();
		return {
			listStyle : listStyle
		}
	},
	onClick:function(e){
		var listType = e.currentTarget.getAttribute('data-listtype');
		console.log("onClick:" + listType);
		Ctr_Strage.Action.setMyWorkitemListViewType(listType);
	},
	onChanged:function(e){
		console.log("onChanged");
	},
	render: function() {
		var minimum_label_classes = ["btn", "btn-primary"];
		if(this.state.listStyle == Ctr_Strage.ViewType.MINIMUM){
			minimum_label_classes.push("active");
		}

		var card_label_classes = ["btn", "btn-primary"];
		if(this.state.listStyle == Ctr_Strage.ViewType.CARD){
			card_label_classes.push("active");
		}
		return (
			<div className="btn-group" data-toggle="buttons">
				<label className={minimum_label_classes.join(" ")} onClick={this.onClick} data-listtype={Ctr_Strage.ViewType.MINIMUM}>
					<input type="radio" name="options" onChange={this.onChanged} checked={this.state.listStyle == Ctr_Strage.ViewType.MINIMUM}/>
					<span className={"icon icon-view_list"} />
				</label>
				<label className={card_label_classes.join(" ")} onClick={this.onClick} data-listtype={Ctr_Strage.ViewType.CARD}>
					<input type="radio" name="options" onChange={this.onChanged} checked={this.state.listStyle == Ctr_Strage.ViewType.CARD}/>
					<span className={"icon icon-view_module"} />
				</label>
			</div>
		);
	}
});