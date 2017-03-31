'use strict';

var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    displayName: 'exports',

    onClick: function onClick(e) {
        //var viewName = e.target.getAttribute('data-viewname');
        //console.log("onClickNavItem:" + viewName);
        console.log(e.target);
        console.log(e.currentTarget);
        Controller_View.Action.setView(this.props.view_name);
    },
    render: function render() {
        var classes = ["nav-item"];

        if (typeof this.props.active !== "undefined" && this.props.active) {
            classes.push("nav-item-active");
        }

        var icon = null;
        if (this.props.icon) {
            icon = React.createElement('span', { className: "icon icon-" + this.props.icon });
            classes.push("nav-item-has-icon");
        }

        return React.createElement(
            'div',
            { className: classes.join(" "), onClick: this.onClick },
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
