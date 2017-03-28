'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    displayName: 'exports',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'footer-item', style: {
                    display: "table",
                    width: "100%",
                    height: "100%"
                } },
            React.createElement(
                'div',
                { style: {
                        display: "table-cell",
                        verticalAlign: "middle",
                        textAlign: "center"
                    } },
                this.props.children
            )
        );
    }
});
