'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    displayName: 'exports',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'footer-item' },
            React.createElement(
                'div',
                { style: { display: "table" } },
                React.createElement(
                    'div',
                    { style: { display: "table-cell" } },
                    this.props.children
                )
            )
        );
    }
});
