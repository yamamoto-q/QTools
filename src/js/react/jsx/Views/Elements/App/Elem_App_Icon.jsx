/**
 * アプリ一覧
 **/
var React = require('react');
var Ctr_Strage = require('./Contloller_Strage.js');
var AppItem = require('./Elem_App_Item.js');

module.exports = React.createClass({
	render: function() {
		return (
			<div id="appicon">
				<div className="squarebox">
					<div className="squarebox-content">content</div>
				</div>
			</div>
		);
	}
});