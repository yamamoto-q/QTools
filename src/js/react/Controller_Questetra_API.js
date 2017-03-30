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
    getAllocatedWorkitems:function(){
        // マイタスクの一覧を取得する
        dispatcher.dispatch({
            actionType: "getAllocatedWorkitems",
            value: {
            }
        });
    },
    getOfferedWorkitems:function(){
        // マイタスクの一覧を取得する
        dispatcher.dispatch({
            actionType: "getOfferedWorkitems",
            value: {
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
    CHANGE_ALLOCATED_WORKITEMS:"change_allocated_workitems",
    CHANGE_OFFERED_WORKITEMS:"change_offered_workitems",
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
    allocatedWorkitems : {
        isResultWaiting:false,
        workitems:[],
        update:0
    },
    offeredWorkitems : [],
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
    getAllocatedWorkitems:function(){
        return _state.allocatedWorkitems.workitems;
    },
    getOfferedWorkitems:function(){
        return _state.offeredWorkitems;
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
    addOnGetAvaterListener:function(qUserId, callback){
        this.on(EVENT.ON_GET_AVATER + "-avater-" + qUserId, callback);
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
    // function
    getTimestamp(){
        var date = new Date() ;
        return Math.floor( date.getTime() / 1000 ) ;
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
                    console.log(data);

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
                    console.log(jqXHR, textStatus);
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
                    console.log(htmlText);
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

            case "getAllocatedWorkitems":
                if(_state.allocatedWorkitems.isResultWaiting || Store.getTimestamp() - _state.allocatedWorkitems.update < 30){
                    console.log("Cancel");
                    return;
                }

                _state.allocatedWorkitems.isResultWaiting = true;
                _API.API.PEWorkitemListAllocated(function(data){
                    _state.allocatedWorkitems = {
                        isResultWaiting : false,
                        workitems : data.workitems,
                        update : Store.getTimestamp()
                    }

                    Store.emitChangeAllocatedWorkitems();

                }, function(jqXHR, textStatus){
                    // fail
                    console.log(jqXHR, textStatus);
                    _state.allocatedWorkitems = {
                        isResultWaiting : false
                    }
                });
                break;

            case "getOfferedWorkitems":
                _API.API.PEWorkitemListOffered(function(data){
                    _state.offeredWorkitems = data.workitems;
                    Store.emitChangeOfferedWorkitems();

                }, function(jqXHR, textStatus){
                    // fail
                    console.log(jqXHR, textStatus);
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
