'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    displayName: 'exports',


    render: function render() {
        var classes = ["nav-item"];

        var icon = null;
        if (this.props.icon) {
            icon = React.createElement('span', { className: "icon icon-" + this.props.icon });
            classes.push("nav-item-has-icon");
        }

        return React.createElement(
            'div',
            { className: classes.join(" ") },
            React.createElement(
                'div',
                { style: {
                        display: "table",
                        width: "100%",
                        height: "100%"
                    } },
                React.createElement(
                    'div',
                    { className: 'label-wrapper', style: {
                            display: "table-cell",
                            verticalAlign: "middle"
                        } },
                    icon,
                    React.createElement(
                        'span',
                        { className: 'label' },
                        this.props.children
                    )
                )
            )
        );
    }
});
