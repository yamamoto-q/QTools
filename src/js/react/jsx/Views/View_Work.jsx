var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var TaskSummary = require('./View_Task_Summary.js');

module.exports = React.createClass({
	onClickNavItem:function(e){
		var viewName = e.target.getAttribute('data-viewname');
		console.log("onClickNavItem:" + viewName);
		Controller_View.Action.setView(viewName);
	},
	render: function() {
		return(
			<LayoutHeader label="Work">
				<LayoutBody>
					<LayoutBodyLeft>
						<NavItem icon="home" onClick={this.onClickNavItem} data-viewname={Controller_View.ViewNames.WORK}>Home</NavItem>
						<NavItem icon="inbox" active={true}>Work</NavItem>
						<NavItem icon="chat_bubble">C</NavItem>
					</LayoutBodyLeft>
					<LayoutBodyRight>
						<TaskSummary />
					</LayoutBodyRight>
				</LayoutBody>
				<Footer>
					<NavItem icon="home" onClick={this.onClickNavItem} data-viewname={Controller_View.ViewNames.WORK}>Home</NavItem>
					<NavItem icon="inbox" active={true}>Work</NavItem>
					<NavItem icon="chat_bubble">C</NavItem>
				</Footer>
			</LayoutHeader>
		)
	}
});