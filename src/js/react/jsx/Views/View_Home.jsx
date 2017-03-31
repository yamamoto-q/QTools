var React = require('react');

var LayoutHeader = require('./Layout_Header.js');

var LayoutBody = require('./Layout_Body.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');
var Bootstrap_Container = require('./Bootstrap_Container.js');
var Bootstrap_Row = require('./Bootstrap_Row.js');
var Bootstrap_Col = require('./Bootstrap_Col.js');
var ScrollArea = require('./ScrollArea.js');

var TaskSummary = require('./View_Task_Summary.js');

module.exports = React.createClass({
	render: function() {
		return(
			<LayoutHeader label="Home">
				<LayoutBody>
					<div className="col nav-items nav-items-v hidden-xs-down" style={{flexBasis:"210px", flexGrow: "0"}}>
						<ScrollArea>
							<NavItem icon="home">Home</NavItem>
							<NavItem icon="inbox">B</NavItem>
							<NavItem icon="chat_bubble">C</NavItem>
						</ScrollArea>
					</div>
					<div className="col">
						<ScrollArea>
							<div className="card-group">
								<TaskSummary />
							</div>
						</ScrollArea>
					</div>
				</LayoutBody>
				<Footer>
					<NavItem icon="home">Home</NavItem>
					<NavItem icon="inbox">B</NavItem>
					<NavItem icon="chat_bubble">C</NavItem>
				</Footer>
			</LayoutHeader>
		)
	}
});