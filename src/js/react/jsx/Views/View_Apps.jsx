var React = require('react');
var Controller_View = require('./Controller_View.js');

var LayoutHeader = require('./Layout_Header.js');
var LayoutBody = require('./Layout_Body.js');
var LayoutBodyLeft = require('./Layout_BodyLeft.js');
var LayoutBodyRight = require('./Layout_BodyRight.js');
var ScrollArea = require('./ScrollArea.js');

var Footer = require('./Footer.js');
var NavItem = require('./NavItem.js');

var Ctr_QApi = require('./Controller_Questetra_API.js');
var Ctr_Login = require('./Controller_Login.js');

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
	sortScore(info){
		var score = "";
		if(!info.processModelInfoHasActiveProcessModel){
			score += "1";
		}else if(!info.starred){
			score += "2";
		}else{
			score += "3";
		}

		score += ("00" + info.allocatedWorkitems.length).slice(-2);
		score += ("00" + info.offeredWorkitems.length).slice(-2);
		score += ("00" + info.startableActivitis.length).slice(-2);

		if(Ctr_Login.Store.getLoginedUser().name == info.processModelInfoCreateQuserName){
			score += "1";
		}else{
			score += "0";
		}

		if(!info.authorities){
			score += "0";
		}else{
			if(info.authorities.indexOf("PROCESS_MODEL_MANAGER") != -1){
				score += "1";
			}else{
				score += "0";
			}
		}

		score += info.processModelInfoViewPriority;

		return parseInt(score,10);
	},
	sortApp:function(apps){
		console.log("sort");
		var self = this;
		apps.sort(function(a, b){
			var scoreA = self.sortScore(a);
			var scoreB = self.sortScore(b);
			console.log("score:" + scoreA + "," + scoreB);
			if(scoreA > scoreB){
				return -1;
			}
			if(scoreA < scoreB){
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
				<AppItem key={"view-apps-app-" + this.state.apps[i].processModelInfoId} app={this.state.apps[i]} />
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
						</ul>
						<div className="tab-content">
							<div className="tab-pane height-fix active" id="home" role="tabpanel">
								<div className="container-fluid">
									{allApps}
								</div>
							</div>
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