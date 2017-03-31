var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    clickCancell: function(e){
        e.preventDefault();
    },
    render: function() {
        var classes = ["nav-item"];

        if(typeof this.props.active !== "undefined" && this.props.active){
            classes.push("nav-item-active");
        }

        var icon = null;
        if(this.props.icon){
            icon = (
                <span className={"icon icon-" + this.props.icon} onClick={this.clickCancell}/>
            );
            classes.push("nav-item-has-icon");
        }

        return (
            <div className={classes.join(" ")} onClick={this.props.on_click} data-viewname={this.props.view_name}>
                <div style={{
                    display:"table",
                    width:"100%",
                    height: "100%"
                }} onClick={this.clickCancell}>
                    <div className="label-wrapper" style={{
                        display:"table-cell",
                        verticalAlign: "middle"
                    }} onClick={this.clickCancell}>
                        {icon}<span className="label"onClick={this.clickCancell}>{this.props.children}</span>
                    </div>
                </div>
            </div>
        );
    }
});

