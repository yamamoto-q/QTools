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
		$("body").addClass('view-' + Controller_View.ViewNames.WORK);
	},
	componentWillUnmount:function(){
		$("body").removeClass('view-' + Controller_View.ViewNames.WORK);
	},
	render: function() {
		return(
			<LayoutHeader label="Work">
				<LayoutBody>
					<LayoutBodyLeft>
						<NavItem icon="home" view_name={Controller_View.ViewNames.HOME}>Home</NavItem>
						<NavItem icon="inbox" active={true}>Work</NavItem>
						<NavItem icon="games" view_name={Controller_View.ViewNames.APPS}>Apps</NavItem>
					</LayoutBodyLeft>
					<LayoutBodyRight>
						<MyWorkitemList />
					</LayoutBodyRight>
				</LayoutBody>
				<Footer>
					<NavItem icon="home" view_name={Controller_View.ViewNames.HOME}>Home</NavItem>
					<NavItem icon="inbox" active={true}>Work</NavItem>
					<NavItem icon="games" view_name={Controller_View.ViewNames.APPS}>Apps</NavItem>
				</Footer>
			</LayoutHeader>
		)
	}
});