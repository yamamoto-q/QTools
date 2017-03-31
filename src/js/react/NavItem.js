'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    displayName: 'exports',

    clickCancell: function clickCancell(e) {
        e.preventDefault();
    },
    render: function render() {
        var classes = ["nav-item"];

        if (typeof this.props.active !== "undefined" && this.props.active) {
            classes.push("nav-item-active");
        }

        var icon = null;
        if (this.props.icon) {
            icon = React.createElement('span', { className: "icon icon-" + this.props.icon, onClick: this.clickCancell });
            classes.push("nav-item-has-icon");
        }

        return React.createElement(
            'div',
            { className: classes.join(" "), onClick: this.props.on_click, 'data-viewname': this.props.view_name },
            React.createElement(
                'div',
                { style: {
                        display: "table",
                        width: "100%",
                        height: "100%"
                    }, onClick: this.clickCancell },
                React.createElement(
                    'div',
                    { className: 'label-wrapper', style: {
                            display: "table-cell",
                            verticalAlign: "middle"
                        }, onClick: this.clickCancell },
                    icon,
                    React.createElement(
                        'span',
                        { className: 'label', onClick: this.clickCancell },
                        this.props.children
                    )
                )
            )
        );
    }
});
