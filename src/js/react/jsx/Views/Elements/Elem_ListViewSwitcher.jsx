var React = require('react');
module.exports = React.createClass({
	render: function() {
		return (
			<div className="btn-group" data-toggle="buttons">
				<label className="btn">
					<input type="radio" name="options" id="option1" autoComplete="off"/>
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