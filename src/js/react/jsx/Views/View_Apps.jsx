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
var Ctr_Strage = require('./Contloller_Strage.js');

var SortSwitcher = require('./Elem_AppViewSortSwitcher.js');
var AppItem = require('./Elem_AppItem.js');

module.exports = React.createClass({
	getInitialState: function() {
		var apps = Ctr_QApi.Store.getApps();
		var sortType = Ctr_Strage.Store.getAppListViewSortType();
		var sortAndFilteredApps = this.sortApp(apps, sortType);
		return {
			apps:apps,
			sortAndFilteredApps:sortAndFilteredApps,
			sortType:sortType
		};
	},
	componentDidMount: function() {
		$("body").addClass('view-' + Controller_View.ViewNames.APPS);

		var self = this;
		Ctr_QApi.Store.addChangeAppsListener(function(){
			if (self.isMounted()) {
				var apps = Ctr_QApi.Store.getApps();
				var sortAndFilteredApps = self.sortApp(apps, self.state.sortType);
				self.setState({
					apps:apps,
					sortAndFilteredApps:sortAndFilteredApps
				});
			}
		});

		// ソート方法が更新されたとき
		Ctr_Strage.Store.addChangeAppListViewSortTypeListener(function(){
			if (self.isMounted()) {
				var sortType = Ctr_Strage.Store.getAppListViewSortType();
				var sortAndFilteredApps = self.sortApp(self.state.apps, sortType);
				self.setState({
					sortType:sortType,
					sortAndFilteredApps:sortAndFilteredApps
				});
			}
		});

		Ctr_QApi.Action.getApps();
	},
	componentWillUnmount:function(){
		$("body").removeClass('view-' + Controller_View.ViewNames.APPS);
	},
	aiSortScore(info){
		var score = "";

		// 無効とスター
		if(info.starred){
			// スター付は最優先
			score += "9";
		}else if(info.processModelInfoHasActiveProcessModel){
			// スターがない
			score += "2";
		}else{
			// アクティブではないものは優先度最下位
			score += "1";
		}

		score += "000"; // ToDo 遷移度

		score += ("00" + info.allocatedWorkitems.length).slice(-2);	// 割り当て件数
		score += ("00" + info.offeredWorkitems.length).slice(-2);	// オファー件数
		score += ("00" + info.startableActivitis.length).slice(-2);	// スタートできるアクティビティ数

		if(Ctr_Login.Store.getLoginedUser().name == info.processModelInfoCreateQuserName){
			// モデルの制作者の場合
			score += "1";
		}else{
			score += "0";
		}

		if(!info.authorities){
			// モデル権限が無い（nullの場合がある）
			score += "0";
		}else{
			if(info.authorities.indexOf("PROCESS_MODEL_MANAGER") != -1){
				// モデル編集権限
				score += "1";
			}else{
				// モデル権限が無い
				score += "0";
			}
		}

		score += info.processModelInfoViewPriority;

		return parseInt(score,10);
	},
	startableSortScore(info){
		var score = "";
		if(info.starred || info.processModelInfoHasActiveProcessModel){
			// スター付の優先度は無視
			score += "2";
		}else{
			// アクティブではないものは優先度最下位
			score += "1";
		}

		score += ("00" + info.startableActivitis.length).slice(-2);	// スタートできるアクティビティ数
		score += "000"; // ToDo 遷移度
		score += ("00" + info.allocatedWorkitems.length).slice(-2);	// 割り当て件数
		score += ("00" + info.offeredWorkitems.length).slice(-2);	// オファー件数

		if(Ctr_Login.Store.getLoginedUser().name == info.processModelInfoCreateQuserName){
			// モデルの制作者の場合
			score += "1";
		}else{
			score += "0";
		}

		if(Ctr_Login.Store.getLoginedUser().name == info.processModelInfoCreateQuserName){
			// モデルの制作者の場合
			score += "1";
		}else{
			score += "0";
		}

		score += info.processModelInfoViewPriority;
		return parseInt(score,10);
	},
	sortApp:function(apps, sortType){
		//console.log("sort");
		var self = this;
		switch (sortType){
			case Ctr_Strage.AppSortTypes.STARTABLE:
				// 開始可能なAPP優先
				apps = apps.filter(function(element, index, array){
					if(element.startableActivitis.length > 0){
						return true;
					}
					return false;
				});
				/*
				apps.sort(function(a, b){
					var scoreA = self.startableSortScore(a);
					var scoreB = self.startableSortScore(b);
					if(scoreA > scoreB){
						return -1;
					}
					if(scoreA < scoreB){
						return 1;
					}
					return 0;
				});
				*/
				break;
			default:
				// AI Sort
				apps.sort(function(a, b){
					var scoreA = self.aiSortScore(a);
					var scoreB = self.aiSortScore(b);
					if(scoreA > scoreB){
						return -1;
					}
					if(scoreA < scoreB){
						return 1;
					}
					return 0;
				});
				break;
		}

		return apps;
	},
	render: function() {
		var allApps = [];

		//console.log("apps", this.state.apps);
		for (var i = 0; i < this.state.sortAndFilteredApps.length; i++) {
			allApps.push(
				<AppItem key={"view-apps-app-" + this.state.sortAndFilteredApps[i].processModelInfoId} app={this.state.sortAndFilteredApps[i]} />
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
						<div className="container-fluid">
							<SortSwitcher />
							{allApps}
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