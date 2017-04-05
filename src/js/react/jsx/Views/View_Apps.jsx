var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var MyWorkitemList = require('./Elem_MyWorkitemList.js');

module.exports = React.createClass({
	componentDidMount: function() {
		$("body").addClass('view-' + Controller_View.ViewNames.APPS);
	},
	componentWillUnmount:function(){
		$("body").removeClass('view-' + Controller_View.ViewNames.APPS);
	},
	render: function() {
		return(
			<LayoutHeader label="Apps">
				<LayoutBody>
					<LayoutBodyLeft>
						<NavItem icon="home" view_name={Controller_View.ViewNames.HOME}>Home</NavItem>
						<NavItem icon="inbox" view_name={Controller_View.ViewNames.WORK}>Work</NavItem>
						<NavItem icon="games" active={true}>Apps</NavItem>
					</LayoutBodyLeft>
					<LayoutBodyRight>
						<ul className="nav nav-tabs" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#home" role="tab">Home</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#profile" role="tab">Profile</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#messages" role="tab">Messages</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#settings" role="tab">Settings</a>
							</li>
						</ul>
						<div className="tab-content">
							<div className="tab-pane active" id="home" role="tabpanel">...</div>
							<div className="tab-pane" id="profile" role="tabpanel">...</div>
							<div className="tab-pane" id="messages" role="tabpanel">...</div>
							<div className="tab-pane" id="settings" role="tabpanel">...</div>
						</div>
					</LayoutBodyRight>
				</LayoutBody>
				<Footer>
					<NavItem icon="home" view_name={Controller_View.ViewNames.HOME}>Home</NavItem>
					<NavItem icon="inbox" view_name={Controller_View.ViewNames.WORK}>Work</NavItem>
					<NavItem icon="games" active={true}>Apps</NavItem>
				</Footer>
			</LayoutHeader>
		)
	}
});