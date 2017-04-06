var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var Ctr_QApi = require('./Controller_Questetra_API.js');

var AppItem = require('./Elem_AppItem.js');

module.exports = React.createClass({
	getInitialState: function() {
		var apps = this.sortApp(Ctr_QApi.Store.getApps());
		return {
			apps:apps
		};
	},
	componentDidMount: function() {
		$("body").addClass('view-' + Controller_View.ViewNames.APPS);

		var self = this;
		Ctr_QApi.Store.addChangeAppsListener(function(){
			if (self.isMounted()) {
				var apps = self.sortApp(Ctr_QApi.Store.getApps());
				self.setState({
					apps:apps
				});
			}
		});

		Ctr_QApi.Action.getApps();
	},
	componentWillUnmount:function(){
		$("body").removeClass('view-' + Controller_View.ViewNames.APPS);
	},
	sortApp:function(apps){
		//processModelInfoHasActiveProcessModel
		apps.sort(function(a, b){
			if(a.processModelInfoHasActiveProcessModel && !b.processModelInfoHasActiveProcessModel){
				return -1;
			}
			if(!a.processModelInfoHasActiveProcessModel && b.processModelInfoHasActiveProcessModel){
				return 1;
			}
			return 0;
		});

		// offeredWorkitems
		apps.sort(function(a, b){
			if(a.offeredWorkitems.length > b.offeredWorkitems.length){
				return -1;
			}
			if(a.offeredWorkitems.length < b.offeredWorkitems.length){
				return 1;
			}
			return 0;
		});

		// allocatedWorkitems
		apps.sort(function(a, b){
			if(a.allocatedWorkitems.length > b.allocatedWorkitems.length){
				return -1;
			}
			if(a.allocatedWorkitems.length < b.allocatedWorkitems.length){
				return 1;
			}
			return 0;
		});

		// Stared
		apps.sort(function(a, b){
			if(a.starred && !b.starred){
				return -1;
			}
			if(!a.starred && b.starred){
				return 1;
			}
			return 0;
		});
		return apps;
	},
	render: function() {
		var allApps = [];

		console.log("apps", this.state.apps);
		for (var i = 0; i < this.state.apps.length; i++) {
			allApps.push(
				<AppItem app={this.state.apps[i]} />
			);
		}

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
							<div className="tab-pane active" id="home" role="tabpanel">
								{allApps}
							</div>
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