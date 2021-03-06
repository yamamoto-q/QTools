var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var MyWorkItemsSummary = require('./Elem_MyWorkItems_Summary.js');
var AppSummary = require('./Elem_App_Summary.js');

module.exports = React.createClass({
	componentDidMount: function() {
		$("body").addClass('view-' + Controller_View.ViewNames.HOME);
	},
	componentWillUnmount:function(){
		$("body").removeClass('view-' + Controller_View.ViewNames.HOME);
	},
	render: function() {
		return(
			<LayoutHeader label="Home">
				<LayoutBody>
					<LayoutBodyLeft>
						<NavItem icon="home" active={true}>Home</NavItem>
						<NavItem icon="inbox" view_name={Controller_View.ViewNames.WORK}>Work</NavItem>
						<NavItem icon="games" view_name={Controller_View.ViewNames.APPS}>Apps</NavItem>
					</LayoutBodyLeft>
					<LayoutBodyRight>
						<div className="card-deck">
							<MyWorkItemsSummary />
							<AppSummary />
						</div>
					</LayoutBodyRight>
				</LayoutBody>
				<Footer>
					<NavItem icon="home" active={true}>Home</NavItem>
					<NavItem icon="inbox" view_name={Controller_View.ViewNames.WORK}>Work</NavItem>
					<NavItem icon="games" view_name={Controller_View.ViewNames.APPS}>Apps</NavItem>
				</Footer>
			</LayoutHeader>
		)
	}
});