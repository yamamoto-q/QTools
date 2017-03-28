var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="footer-item">{this.props.children}</div>
        );
    }
});
