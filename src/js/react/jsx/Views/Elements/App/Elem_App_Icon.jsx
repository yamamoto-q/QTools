/**
 * アプリ一覧
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	render: function() {
		var classes = ["appicon"];
		if(this.props.isActive){
			classes.push("appicon-active");
		}else{
			classes.push("appicon-deactive");
		}
		return (
			<div className={classes.join(" ")}>
				<div className="squarebox">
					<div className="squarebox-content">content</div>
					<div className="appicon-tl">TL</div>
					<div className="appicon-tr">TR</div>
				</div>
			</div>
		);
	}
});