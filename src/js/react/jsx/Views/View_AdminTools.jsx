var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');

var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
	onclickBack:function(){
		Controller_View.Action.historyBack();
	},
	render: function() {
		return(
			<Bootstrap_Container>
				<Bootstrap_Row>
					<Bootstrap_Col>
						<a onClick={this.onclickBack}>Back</a>
					</Bootstrap_Col>
				</Bootstrap_Row>
			</Bootstrap_Container>
		)
	}
});