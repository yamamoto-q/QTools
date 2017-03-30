'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    displayName: 'exports',


    render: function render() {
        var icon = null;
        if (this.props.icon) {
            icon = React.createElement('span', { className: "icon icon-" + this.props.icon });
        }
        return React.createElement(
            'div',
            { className: 'nav-item' },
            React.createElement(
                'div',
                { style: {
                        display: "table",
                        width: "100%",
                        height: "100%"
                    } },
                React.createElement(
                    'div',
                    { style: {
                            display: "table-cell",
                            verticalAlign: "middle"
                        } },
                    { icon: icon },
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
