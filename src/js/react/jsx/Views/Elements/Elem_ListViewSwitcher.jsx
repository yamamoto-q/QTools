var React = require('react');
module.exports = React.createClass({
	render: function() {
		return (
			<div className="btn-group" data-toggle="buttons">
				<label className="btn btn-primary active">
					<input type="radio" name="options" id="option1" autoComplete="off"/> A
				</label>
				<label className="btn btn-primary">
					<input type="radio" name="options" id="option2" autoComplete="off" /> B
				</label>
				<label className="btn btn-primary">
					<input type="radio" name="options" id="option3" autoComplete="off" /> C
				</label>
			</div>
		);
	}
});