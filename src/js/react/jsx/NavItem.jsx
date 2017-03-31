var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    onClick:function(e){
        if(this.props.view_name && this.props.view_name.length > 0){
            Controller_View.Action.setView(this.props.view_name);
        }
    },
    render: function() {
        var classes = ["nav-item"];

        if(typeof this.props.active !== "undefined" && this.props.active){
            classes.push("nav-item-active");
        }

        var icon = null;
        if(this.props.icon){
            icon = (
                <span className={"icon icon-" + this.props.icon} />
            );
            classes.push("nav-item-has-icon");
        }

        return (
            <div className={classes.join(" ")} onClick={this.onClick}>
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

