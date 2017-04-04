var React = require('react');
module.exports = React.createClass({
	getInitialState: function() {
		var listStyle = this.props.list_style;
		if(typeof listStyle === "undefined" || !listStyle || listStyle.length == 0){
			listStyle = Ctr_Strage.ViewType.MINIMUM;
		}

		return {
			listStyle : listStyle
		}
	},
	render: function() {
		var minimum_label_classes = ["btn"];
		if(this.state.listStyle == Ctr_Strage.ViewType.MINIMUM){
			minimum_label_classes.push("active");
		}
		return (
			<div className="btn-group" data-toggle="buttons">
				<label className={minimum_label_classes.join(" ")}>
					<input type="radio" name="options" id="option1" autoComplete="off" checked={this.state.listStyle == Ctr_Strage.ViewType.MINIMUM}/>
					<span className={"icon icon-view_list"} />
				</label>
				<label className="btn">
					<input type="radio" name="options" id="option2" autoComplete="off" />
					<span className={"icon icon-view_module"} />
				</label>
			</div>
		);
	}
});