var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({

    render: function() {
        var classes = ["nav-item"];

        var icon = null;
        if(this.props.icon){
            icon = (
                <span className={"icon icon-" + this.props.icon} />
            );
            classes.push("nav-item-has-icon");
        }

        return (
            <div className={classes.join(" ")}>
                <div style={{
                    display:"table",
                    width:"100%",
                    height: "100%"
                }}>
                    <div className="label-wrapper" style={{
                        display:"table-cell",
                        verticalAlign: "middle"
                    }}>
                        {icon}<span className="label">{this.props.children}</span>
                    </div>
                </div>
            </div>
        );
    }
});

