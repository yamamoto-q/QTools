var React = require('react');
var Controller_View = require('./Controller_View.js');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="nav-item">
                <div style={{
                    display:"table",
                    width:"100%",
                    height: "100%"
                }}>
                    <div style={{
                        display:"table-cell",
                        verticalAlign: "middle",
                        textAlign: "center"
                    }}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

