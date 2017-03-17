var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();

var _Strage = require('./Contloller_Strage.js');
var _QApi = require('./Controller_Questetra_API.js');

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
    }
};

var _state = {
	isWaitingStrage:true,
	isValidAuthParam:false,
	isChallengeLogin:false,
	loginSuccess:false,
	auth:{
		api_password : null,
		context_path : null,
		email : null
	}
}


// Store
var EVENT = {
    CHANGE_STATE: "change_state"
}

var Store = assign({}, EventEmitter.prototype, {
	isWaitingStrage:function(){
		return _state.isWaitingStrage;
	},
	isValidAuthParam:function(){
		return _state.isValidAuthParam;
	},
	isChallengeLogin:function(){
		return _state.isChallengeLogin;
	},
	loginSuccess:function(){
		return _state.loginSuccess;
	},
	getAuth:function(){
		return _state.auth;
	},
	// Event
    addChangeStateListener:function(callback){
        this.on(EVENT.CHANGE_STATE, callback);
    },
    emitChangeState:function(){
    	console.log("emitChangeState");
        this.emit(EVENT.CHANGE_STATE);
    },
    // Dispacher
    dispatcherIndex: dispatcher.register(function(payload) {
        switch (payload.actionType) {
    		case "setAuth":
    			// Strage に認証情報を保存する （ > 2 Strage に保存された認証情報が変更された時　が発生する）
    			var context_path = payload.value.context;
                var email = payload.value.email;
                var api_password = payload.value.api_password;
                //console.log("setAuth", context_path, email, api_password);

                // 保存
                _Strage.Action.setAuthentication(context_path, email, api_password);

    			break;
        };
    })
});

module.exports = {
    Action: Action,
    Store: Store
}

// 1. Strage から認証情報を取得する
_Strage.Store.addGetAuthenticationListener(function () {
	_onGetAndChangeStrageAuth();


});

// 2. Strage に保存された認証情報が変更された時
_Strage.Store.addChangeAuthenticationListener(function () {
	_onGetAndChangeStrageAuth();
});

// 3. Strage に保存された認証情報にもとづき、Stateを変更する
var _onGetAndChangeStrageAuth = function(){
	var auth = _Strage.Store.getAuthState();
	_state.isWaitingStrage = false;
	_state.loginSuccess = false;

	if(auth && auth.api_password && auth.context_path && auth.email){
		_state.auth.api_password = auth.api_password;
		_state.auth.context_path = auth.context_path;
		_state.auth.email = auth.email;
		_state.isValidAuthParam = true;

		_challengeLogin();
		return;
	}else{
		_state.auth.api_password = null;
		_state.auth.context_path = null;
		_state.auth.email = null;
		_state.isValidAuthParam = false;

		Store.emitChangeState();
	}
}

// 4. ログインにチャレンジする
var _challengeLogin = function(){
	_state.isChallengeLogin = true;
	_state.loginSuccess = false;
	Store.emitChangeState();
	_QApi.Action.setAuth(_state.auth.context_path, _state.auth.email, _state.auth.api_password);
	_QApi.Action.challengLogin();
};

//
_QApi.Store.addLoginSuccessListener(function(){
	setTimeout(function(){
		_state.isChallengeLogin = false;
		_state.loginSuccess = true;
		Store.emitChangeState();
	}, 250);
});

_QApi.Store.addLoginErrorListener(function () {
	setTimeout(function(){
		_state.isChallengeLogin = false;
		_state.loginSuccess = false;
		Store.emitChangeState();
	}, 250);
});

setTimeout(function(){
	_Strage.Action.getAuthentication();
}, 1000);