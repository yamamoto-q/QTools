var React = require('react');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');

module.exports = React.createClass({
	render: function() {
		return(
			<div id="body" className="height-fix">
				<Bootstrap_Container className="height-fix">
					<Bootstrap_Row className="height-fix" style={{flexWrap:"nowrap"}}>
					{this.props.children}
					</Bootstrap_Row>
				</Bootstrap_Container>
			</div>
		)
	}
});