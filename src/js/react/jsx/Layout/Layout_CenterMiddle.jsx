var React = require('react');
module.exports = React.createClass({
	render: function() {
		return(
			<div style={{display:"table", height:"100%", width:"100%"}}>
				<div style={{display:"table-cell", verticalAlign:"middle", textAlign:"center"}}>
					{this.props.children}
				</div>
			</div>
		)
	}
});