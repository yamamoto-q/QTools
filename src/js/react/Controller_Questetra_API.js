var md5 = require('md5-node');
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();


var _API = require('./Questetra_API.js');

var Action = {
    setAuth:function(context, email, api_password){
        dispatcher.dispatch({
            actionType: "setAuth",
            value: {
                context:context,
                email:email,
                api_password:api_password
            }
        });
    },
    challengLogin:function(){
        dispatcher.dispatch({
            actionType: "challengLogin",
            value: {
            }
        });
    },
    checkPermission:function(){
        // ログインしているユーザーの権限を調査する
        dispatcher.dispatch({
            actionType: "checkPermission",
            value: {
            }
        });
    },
    startCheckWorkItems:function(){
        // マイタスクの定期チェックを開始する
        setTimeout(function(){
            dispatcher.dispatch({
                actionType: "startCheckWorkItems",
                value: {
                }
            });
        },250)
    },
    getWorkitems:function(){
        // Allocated、Offered を合わせた問い合わせ
        dispatcher.dispatch({
            actionType: "getWorkitems",
            value: {
            }
        });
    },
    getAllocatedWorkitems:function(){
        // マイタスクの一覧を取得する
        dispatcher.dispatch({
            actionType: "getAllocatedWorkitems",
            value: {
            }
        });
    },
    getOfferedWorkitems:function(){
        // オファータスクの一覧を取得する
        dispatcher.dispatch({
            actionType: "getOfferedWorkitems",
            value: {
            }
        });
    },
    getApps:function(){
        dispatcher.dispatch({
            actionType: "getApps",
            value: {
            }
        });
    },
    getStartableActivities:function(){
        // 新規開始できるプロセスモデル一覧を取得する
        dispatcher.dispatch({
            actionType: "getStartableActivities",
            value: {
            }
        });
    },
    getProcessModelList:function(isAuthorizedOnly){
        // プロセスモデル一覧を取得する
        dispatcher.dispatch({
            actionType: "getProcessModelList",
            value: {
                isAuthorizedOnly:isAuthorizedOnly
            }
        });
    },
    getAvater:function(qUserId){
        if(typeof _state.resopnses['avater-' + qUserId] === "undefined"){
            dispatcher.dispatch({
                actionType: "getAvater",
                value: {
                    qUserId:qUserId,
                    requestId:'avater-' + qUserId
                }
            });
        }else{
            setTimeout(function(){
                Store.emitOnGetAvater('avater-' + qUserId);
            }, 100);
        }
    }
};

// Store
var EVENT = {
    LOGIN_ERROR: "login_error",
    LOGIN_SUCCESS: "login_success",
    CHECKED_PERMISSION:"checked_permission",
    CHANGE_WORKITEMS:"change_workitems",
    CHANGE_ALLOCATED_WORKITEMS:"change_allocated_workitems",
    CHANGE_OFFERED_WORKITEMS:"change_offered_workitems",
    CHANGE_APPS:"change_apps",
    CHANGE_STARTABLE_ACTIVITIES:"change_startable_activity",
    CHANGE_PROCESSMODEL_LIST:"change_processmodel_list",
    ON_GET_AVATER: "on_get_avater"
}

var _state = {
	auth:{
		api_password : null,
		context_path : null,
		email : null
	},
    permission:{
        isSystemAdmin:false,
        isUserManager:false,
        isProcessModelCreator:false
    },
    workitemCheckTimer:null,
    allocatedWorkitems : {
        isResultWaiting:false,
        workitems:[],
        update:0,
        hash:null
    },
    offeredWorkitems : {
        isResultWaiting:false,
        workitems:[],
        update:0,
        hash:null
    },
    apps:{
        startableActivities:{
            activities:[],
            hash:null
        },
        infos:{
            infos:[],
            hash:null
        },
        index:{
            index:{},
            hash:null
        }
    },
    userQuserSelf:null,
    resopnses:{}
};

var Store = assign({}, EventEmitter.prototype, {
    getLoginedUser:function(){
        return _state.userQuserSelf;
    },
    getAvater:function(qUserId){
        return _state.resopnses['avater-' + qUserId];
    },
    getWorkitems:function(){
        // Allocated、Offered、を区別せずに取得する
        var allocated = _state.allocatedWorkitems.workitems;
        var offered = _state.offeredWorkitems.workitems;
        return allocated.concat(offered);
    },
    getAllocatedWorkitems:function(){
        return _state.allocatedWorkitems.workitems;
    },
    getOfferedWorkitems:function(){
        return _state.offeredWorkitems.workitems;
    },
    getAppsIndex:function(){
        return _state.apps.index.index;
    },
    getStartableActivities:function(){
        return _state.apps.startableActivities.activities;
    },
    getProcessModelList:function(){
        return _state.apps.infos.infos;
    },
    getPermission:function(){
        return _state.permission;
    },
	// Event
    addLoginSuccessListener:function(callback){
        this.on(EVENT.LOGIN_SUCCESS, callback);
    },
    emitLoginSuccess:function(){
        this.emit(EVENT.LOGIN_SUCCESS);
    },
    addLoginErrorListener:function(callback){
        this.on(EVENT.LOGIN_ERROR, callback);
    },
    emitLoginError:function(){
        this.emit(EVENT.LOGIN_ERROR);
    },
    addPermissionCheckedListener:function(callback){
        this.on(EVENT.CHECKED_PERMISSION, callback);
    },
    emitPermissionChecked:function(){
        this.emit(EVENT.CHECKED_PERMISSION);
    },
    // 
    addOnGetAvaterListener:function(qUserId, callback){
        this.on(EVENT.ON_GET_AVATER + "-avater-" + qUserId, callback);
    },
    removeOnGetAvaterListener:function(qUserId, callback){
        this.removeListener(EVENT.ON_GET_AVATER + "-avater-" + qUserId, callback);
    },
    emitOnGetAvater:function(requestId){
        this.emit(EVENT.ON_GET_AVATER + "-" + requestId);
    },
    addChangeAllocatedWorkitemsListener:function(callback){
        this.on(EVENT.CHANGE_ALLOCATED_WORKITEMS, callback);
    },
    emitChangeAllocatedWorkitems(){
        this.emit(EVENT.CHANGE_ALLOCATED_WORKITEMS);
    },
    addChangeOfferedWorkitemsListener:function(callback){
        this.on(EVENT.CHANGE_OFFERED_WORKITEMS, callback);
    },
    emitChangeOfferedWorkitems(){
        this.emit(EVENT.CHANGE_OFFERED_WORKITEMS);
    },
    // Apps
    addChangeAppsListener:function(callback){
        this.on(EVENT.CHANGE_APPS, callback);
    },
    emitChangeApps(){
        this.emit(EVENT.CHANGE_APPS);
    },
    // Workitems
    addChangeWorkitemsListener:function(callback){
        this.on(EVENT.CHANGE_WORKITEMS, callback);
    },
    emitChangeWorkitems(){
        this.emit(EVENT.CHANGE_WORKITEMS);
    },
    // StartableActivities
    addChangeStartableActivitiesListener(callback){
        this.on(EVENT.CHANGE_STARTABLE_ACTIVITIES, callback);
    },
    emitChangeStartableActivities(){
        this.emit(EVENT.CHANGE_STARTABLE_ACTIVITIES);
    },
    // ProcessModelList
    addChangeProcessModelListListener(callback){
        this.on(EVENT.CHANGE_PROCESSMODEL_LIST, callback);
    },
    emitChangeProcessModelList(){
        this.emit(EVENT.CHANGE_PROCESSMODEL_LIST);
    },
    // function
    getTimestamp(){
        var date = new Date() ;
        return Math.floor( date.getTime() / 1000 ) ;
    },
    _getAllocatedWorkitems(cb){
        //console.log("getAllocatedWorkitems");
        if(_state.allocatedWorkitems.isResultWaiting || Store.getTimestamp() - _state.allocatedWorkitems.update < 25){
            console.log("Cancel");
            cb(false);
            return;
        }

        _state.allocatedWorkitems.isResultWaiting = true;
        _API.API.PEWorkitemListAllocated(function(data){
            console.log("PEWorkitemListAllocate", data);
            var oldHash = _state.allocatedWorkitems.hash;
            var hash = md5(JSON.stringify(data.workitems));

            _state.allocatedWorkitems = {
                isResultWaiting : false,
                workitems : data.workitems,
                update : Store.getTimestamp(),
                hash:hash
            };

            if(oldHash != hash){
                Store._builtModelIndex();
                cb(true);
                return;
            }
            cb(false);
            return;

        }, function(jqXHR, textStatus){
            // fail
            console.log(jqXHR, textStatus);
            _state.allocatedWorkitems.isResultWaiting = false;
            cb(false);
            return;
        });
    },
    _getOfferedWorkitems(cb){
        //console.log("getOfferedWorkitems");
        if(_state.offeredWorkitems.isResultWaiting || Store.getTimestamp() - _state.offeredWorkitems.update < 25){
            console.log("Cancel");
            cb(false);
            return;
        }

        _API.API.PEWorkitemListOffered(function(data){
            var oldHash = _state.offeredWorkitems.hash;
            var hash = md5(JSON.stringify(data.workitems));

            _state.offeredWorkitems = {
                isResultWaiting : false,
                workitems:data.workitems,
                update : Store.getTimestamp(),
                hash:hash
            }

            if(oldHash != hash){
                Store._builtModelIndex();
                cb(true);
                return;
            }
            cb(false);
            return;

        }, function(jqXHR, textStatus){
            // fail
            console.log(jqXHR, textStatus);
            _state.offeredWorkitems.isResultWaiting = false;
            cb(false);
            return;
        });
    },
    _getStartableActivities(cb){
        // 新規開始できるプロセスモデル一覧を取得する
        _API.API.PEProcessModeListStartable(function(data){
            var oldHash = _state.apps.startableActivities.hash;
            var hash = md5(JSON.stringify(data.startableActivities));

            _state.apps.startableActivities.activities = data.startableActivities;
            _state.apps.startableActivities.hash = hash;

            if(oldHash != hash){
                Store._builtModelIndex();
                cb(true);
                return;
            }
            cb(false);
            return;

        },function(jqXHR, textStatus){
            // fail
            console.log(jqXHR, textStatus);
            cb(false);
            return;
        });
    },
    _getWorkitems(isAuthorizedOnly, cb){
        // プロセスモデル一覧を取得する
        _API.API.PMMProcessModelList(function(data){
            var oldHash = _state.apps.infos.hash;
            var hash = md5(JSON.stringify(data.processModelInfos));

            _state.apps.infos.infos = data.processModelInfos;
            _state.apps.infos.hash = hash;

            if(oldHash != hash){
                Store._builtModelIndex();
                cb(true);
                return;
            }
            cb(false);
            return;

        },function(jqXHR, textStatus){
            // fail
            console.log(jqXHR, textStatus);
            cb(false);
            return;
        }, isAuthorizedOnly);
    },
    _builtModelIndex(){
        var oldHash = _state.apps.index.hash;

        for (var i = _state.apps.infos.infos.length - 1; i >= 0; i--) {
            var info = _state.apps.infos.infos[i];
            var infoId = info.processModelInfoId;

            var startableActivitis = _state.apps.startableActivities.activities.filter(function(element, index, array){
                return element.processModelInfoId == infoId;
            });
            var allocatedWorkitems = _state.allocatedWorkitems.workitems.filter(function(element, index, array){
                return element.processModelInfoId == infoId;
            });
            var offeredWorkitems = _state.offeredWorkitems.workitems.filter(function(element, index, array){
                return element.processModelInfoId == infoId;
            });

            if(typeof _state.apps.index.index[infoId] === "undegined"){
                _state.apps.index.index[infoId] = {};
            }

            _state.apps.index.index["p" + infoId] = info;
            _state.apps.index.index["p" + infoId].startableActivitis = startableActivitis;
            _state.apps.index.index["p" + infoId].allocatedWorkitems = allocatedWorkitems;
            _state.apps.index.index["p" + infoId].offeredWorkitems = offeredWorkitems;
        }
        var hash = md5(JSON.stringify(_state.apps.index.index));
        _state.apps.index.hash = hash;

        if(hash != oldHash){
            Store.emitChangeApps();
        }
    },
    // Dispacher
    dispatcherIndex: dispatcher.register(function(payload) {
        switch (payload.actionType) {
    		case "setAuth":
    			_state.auth.context_path = payload.value.context;
                _state.auth.email = payload.value.email;
                _state.auth.api_password = payload.value.api_password;
                _state.userQuserSelf = null;
    			break;

    		case "challengLogin":
    			//console.log(47, "challengLogin");
                _state.userQuserSelf = null;

    			_API.API.setAuth(_state.auth.context_path, _state.auth.email, _state.auth.api_password);
    			_API.API.userQuserSelf(function(data){
    				// Success
                    _state.userQuserSelf = {
                        id : data.quser.id,
                        email : data.quser.email,
                        name : data.quser.name
                    }

                    Store.emitLoginSuccess();

    			}, function(jqXHR, textStatus){
    				// fail
    				console.log(jqXHR, textStatus);
    				Store.emitLoginError();
    			});

    			break;

            case "checkPermission":
                // ログインしたユーザーの権限を調査する
                var fase = 0;
                _state.permission = {
                    isSystemAdmin:false,
                    isUserManager:false,
                    isProcessModelCreator:false
                }

                // ユーザ管理権限 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                _API.API.UserQgroupList(function(data){
                    // Success（ログインしていれば成功するはず）
                    //console.log(data);

                    var sampleGroup = data.qgroups[0]
                    // グループに所属するメンバを取得する（ユーザ管理権限が無ければ失敗する）
                    _API.API.UserMembershipListByQgroup(sampleGroup.id, function(memberships){
                        // Success
                        _state.permission.isUserManager = true;
                        fase++;
                        if(fase == 3){
                            Store.emitPermissionChecked();
                        }
                    }, function(){
                        // fail
                        _state.permission.isUserManager = false;
                        fase++;
                        if(fase == 3){
                            Store.emitPermissionChecked();
                        }
                    })

                },function(jqXHR, textStatus){
                    // fail
                    //console.log(jqXHR, textStatus);
                    fase++;
                    if(fase == 3){
                        Store.emitPermissionChecked();
                    }
                });

                // システム権限の一覧を取得する（システム管理権限が無ければ失敗する）- - - - - - - - - - - - - - - -
                _API.API.AdminSystemAuthorityList(TYPE_OF_SYSTEM_AUTHORIZATION.SYSTEM_ADMIN, function(authority){
                    // Success
                    _state.permission.isSystemAdmin = true;
                    fase++;
                    if(fase == 3){
                        Store.emitPermissionChecked();
                    }

                }, function(jqXHR, textStatus){
                    // fail
                    _state.permission.isSystemAdmin = false;
                    fase++;
                    if(fase == 3){
                        Store.emitPermissionChecked();
                    }
                });

                // ログインユーザがプロセスモデル作成権限を持っているか- - - - - - - - - - - - - - - -
                $.ajax({
                    url: _API.API.getContextPath() + "PMM/ProcessModel/list",
                    type: "GET",
                    dataType: "text",
                    headers: {
                        "Authorization": "Basic " + _API.API.getCredentials()
                    }
                })
                .done(function(htmlText) {
                    //console.log(htmlText);
                    _state.permission.isProcessModelCreator = true;
                    fase++;
                    if(fase == 3){
                        Store.emitPermissionChecked();
                    }
                })
                .fail(function(jqXHR, textStatus) {
                    // fail
                    _state.permission.isProcessModelCreator = false;
                    fase++;
                    if(fase == 3){
                        Store.emitPermissionChecked();
                    }
                });

                break;

            case "startCheckWorkItems":
                if(_state.workitemCheckTimer == null){
                    _state.workitemCheckTimer = setInterval(function(){
                        Action.getWorkitems();
                    },30000);
                }
                //console.log("startCheckWorkItems");
                setTimeout(function(){
                    Action.getWorkitems();
                },250);
                break;

            case"getWorkitems":
                // Allocated、Offered、両方を問い合わせる
                var change = false;
                Store._getAllocatedWorkitems(function(_change){
                    if(_change){
                       Store.emitChangeAllocatedWorkitems();
                       change = true;
                    }

                    Store._getOfferedWorkitems(function(_change){
                        if(_change){
                            Store.emitChangeOfferedWorkitems();
                            change = true;
                        }

                        if(change){
                            Store.emitChangeWorkitems(); 
                        }
                    });
                });

                break;

            case "getAllocatedWorkitems":
                Store._getAllocatedWorkitems(function(change){
                    if(change){
                       Store.emitChangeAllocatedWorkitems(); 
                    }
                });
                break;

            case "getOfferedWorkitems":
                Store._getOfferedWorkitems(function(change){
                    if(change){
                        Store.emitChangeOfferedWorkitems();
                    }
                });
                break;

            case "getApps":

                console.log("getApps");
                // プロセスモデル一覧を取得する
                Store._getWorkitems(false, function(change){
                    if(change){
                        Store.emitChangeProcessModelList();
                    }

                    // 
                    Store._getAllocatedWorkitems(function(change){
                        if(change){
                           Store.emitChangeAllocatedWorkitems(); 
                        }

                        Store._getOfferedWorkitems(function(change){
                            if(change){
                                Store.emitChangeOfferedWorkitems();
                            }

                            // 新規開始できるプロセスモデル一覧を取得する
                            Store._getStartableActivities(function(change){
                                if(change){
                                    Store.emitChangeStartableActivities();
                                }

                                console.log(_state.apps.index.index);
                            });
                        });
                    });
                });

                break;
            case "getStartableActivities":
                // 新規開始できるプロセスモデル一覧を取得する
                Store._getStartableActivities(function(change){
                    if(change){
                        Store.emitChangeStartableActivities();
                    }
                });
                break;

            case "getProcessModelList":
                // プロセスモデル一覧を取得する
                var authorizedOnly = payload.value.isAuthorizedOnly;
                Store._getWorkitems(authorizedOnly, function(change){
                    if(change){
                        Store.emitChangeProcessModelList();
                    }
                });
                break;

            case "getAvater":
                var qUserId = payload.value.qUserId;
                var requestId = payload.value.requestId;

                _API.API.UserIconView(qUserId, function(blob){
                    // Success
                    //console.log(blob);
                    _state.resopnses[requestId] = blob;
                    Store.emitOnGetAvater(requestId);

                }, function(jqXHR, textStatus){
                    // fail
                    console.log(jqXHR, textStatus);
                });
                break;

        };
    })
});

var TYPE_OF_SYSTEM_AUTHORIZATION = {
    SYSTEM_ADMIN:0,
    USER_MANAGER:1,
    PROCESS_MODEL_CREATOR:2
};

module.exports = {
    Action: Action,
    Store: Store,
    TypeOfSystemAuthorization:TYPE_OF_SYSTEM_AUTHORIZATION
}
