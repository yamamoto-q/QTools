var React = require('react');
module.exports = React.createClass({
	render: function() {
		return (
			<div className="list-group">
				<a href="#" className="list-group-item active">Cras justo odio</a>
				<a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
				<a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
				<a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
				<a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
			</div>
		);
	}
});