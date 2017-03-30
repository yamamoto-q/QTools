var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({

    render: function() {
        var icon = null;
        if(this.props.icon){
            icon = (
                <span className={"icon icon-" + this.props.icon} />
            );
        }
        return (
            <div className="nav-item">
                <div style={{
                    display:"table",
                    width:"100%",
                    height: "100%"
                }}>
                    <div style={{
                        display:"table-cell",
                        verticalAlign: "middle"
                    }}>
                        {{icon}}
                        <span className="label">{this.props.children}</span>
                    </div>
                </div>
            </div>
        );
    }
});

