var React = require('react');
var ReactRouter = require('react-router'); 
var Link = ReactRouter.Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div className="list-group">
				<Link to="/">index</Link>
				<Link to="/ToDo">ToDo</Link>
				<a href="#" className="list-group-item active">Cras justo odio</a>
				<a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
				<a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
				<a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
				<a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
			</div>
		);
	}
});