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
    ON_GET_AVATER: "on_get_avater"
}

var _state = {
	auth:{
		api_password : null,
		context_path : null,
		email : null
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
    addOnGetAvaterListener:function(qUserId, callback){
        this.on(EVENT.ON_GET_AVATER + "-avater-" + qUserId, callback);
    },
    emitOnGetAvater:function(requestId){
        this.emit(EVENT.ON_GET_AVATER + "-" + requestId);
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
                // ユーザ管理権限 - - - - - - - - - - - - - - - -
                _API.API.UserQgroupList(function(data){
                    // Success（ログインしていれば成功するはず）
                    console.log(data);

                    // グループに所属するメンバを取得する（ユーザ管理権限が無ければ失敗する）
                    var sampleGroup = data.qgroups[0];
                    _API.API.UserMembershipListByQgroup(sampleGroup.id, function(groups){
                        // Success
                        console.log(groups);

                    }, function(){
                        // fail
                        console.log(jqXHR, textStatus);
                    })

                },function(jqXHR, textStatus){
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

module.exports = {
    Action: Action,
    Store: Store
}
