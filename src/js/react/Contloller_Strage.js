var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();

var Action = {
    getSavedSetting:function(){
        dispatcher.dispatch({
            actionType: "getSavedSetting",
            value: {
            }
        });
    },
    setAuthentication:function(context, email, api_password){
        dispatcher.dispatch({
            actionType: "setAuthentication",
            value: {
                context:context,
                email:email,
                api_password:api_password
            }
        });
    },
    setMyWorkitemListViewType:function(listType){
        dispatcher.dispatch({
            actionType: "setMyWorkitemListViewType",
            value: {
                listType:listType
            }
        });
    }
};

// ****************************************************
var Strage = function(_nameSpace) {
    var nameSpace = _nameSpace;

    function saveObj(key, value) {
        var nameSpaceStr = localStorage.getItem(nameSpace);
        var nameSpaceObj;
        if(nameSpaceStr){
            nameSpaceObj = JSON.parse(nameSpaceStr);
        }else{
            nameSpaceObj = {};
        }
        nameSpaceObj[key] = value;

        localStorage.setItem(nameSpace, JSON.stringify(nameSpaceObj));
        return loadObj(key);
    };

    function loadObj(key) {
        var nameSpaceStr = localStorage.getItem(nameSpace);
        if(nameSpaceStr){
            var nameSpaceObj = JSON.parse(nameSpaceStr);
            if(typeof nameSpaceObj[key] !== "undefined"){
                return nameSpaceObj[key];
            }
        }
        return null;
    };

    function removeByKey(key) {
        localStorage.removeItem(key);
        return;
    };

    function clearAll() {
        localStorage.clear();
        return;
    };

    function getAllKeys() {
        return Object.keys(localStorage);
    };

    function getStrageValue(defaultObj) {
        var nameSpaceStr = localStorage.getItem(nameSpace);
        var nameSpaceObj = null;
        if(nameSpaceStr){
            nameSpaceObj = JSON.parse(nameSpaceStr);
        }

        if (typeof defaultObj === "object") {
            nameSpaceObj = $.extend(defaultObj, nameSpaceObj);
            setStrageValue(nameSpaceObj);
        }

        return nameSpaceObj;
    };

    function setStrageValue(Obj) {
        localStorage.setItem(nameSpace, JSON.stringify(Obj));
    }

    var method = {
        seve: function(key, value) {
            return saveObj(key, value);
        },
        load:function(key, defaultVal){
            var Obj = loadObj(key);
            if (!Obj && typeof defaultVal !== "undefined") {
                return saveObj(key,defaultVal);
            }
            return Obj;
        },
        remove: function(key) {
            removeByKey(key)
        },
        clear: function() {
            clearAll();
        },
        get: function(defaultObj) {
            //console.log("get:defaultObj", defaultObj);
            return getStrageValue(defaultObj);
        },
        set: function(Obj) {
            return setStrageValue(Obj);
        }
    };

    return method;
};
var QIStrage = Strage('Q-Tools');

// ****************************************************
var EVENT = {
    GET_AUTHENTICATION: "get_authentication",
    CHANGE_AUTHENTICATION: "change_authentication",
    CHANGE_MY_WORKITEM_LISTVIEW_TYPE:"change_my_workitemlist_view_type"
}

var VIEW_TYPE = {
    MINIMUM:"minimum",
    CARD:"card"
};

var APP_SORT_TYPE = {
    AI:"ai",
    STARTABLE:"startable"
};

var _state = {
    auth:null,
    view:{
        workitemListViewType:VIEW_TYPE.MINIMUM,
        appSortType:APP_SORT_TYPE.AI
    },
};

var Store = assign({}, EventEmitter.prototype, {
    getState : function(){
        return state;
    },
    getAuthState : function(){
        //console.log(133, _state);
        if(_state && _state.auth){
            return _state.auth;
        }
        return null;
    },
    getMyWorkitemListViewType(){
        //console.log("getMyWorkitemListViewType");
        // マイタスクの表示方法を返す
        if(!_state.view){
            return VIEW_TYPE.MINIMUM;
        }

        var viewType = _state.view.workitemListViewType;
        if(!viewType){
            viewType = VIEW_TYPE.MINIMUM;
        }
        return viewType;
    },
    getAppListViewSortType(){
        // アプリリストのソート種別を返す
        if(!_state.view){
            return APP_SORT_TYPE.AI;
        }
        var sortType = _state.view.appSortType;
        if(!sortType){
            sortType = APP_SORT_TYPE.AI;
        }
        return sortType;
    },
    // Event
    addGetSavedSettingListener: function(callback) {
        this.on(EVENT.GET_AUTHENTICATION, callback);
    },
    emitGetSavedSetting: function() {
        this.emit(EVENT.GET_AUTHENTICATION);
    },
    addChangeAuthenticationListener:function(callback){
        this.on(EVENT.CHANGE_AUTHENTICATION, callback);
    },
    emitChangeAuthentication:function(){
        this.emit(EVENT.CHANGE_AUTHENTICATION);
    },
    //
    addChangeMyWorkitemListViewTypeListener:function(callback){
        this.on(EVENT.CHANGE_MY_WORKITEM_LISTVIEW_TYPE, callback);
    },
    emitChangeMyWorkitemListViewType:function(){
        this.emit(EVENT.CHANGE_MY_WORKITEM_LISTVIEW_TYPE);
    },
    dispatcherIndex: dispatcher.register(function(payload) {
        switch (payload.actionType) {
            case "getSavedSetting":
                var state = QIStrage.get();

                if(state){
                    _state = state;
                }else{
                    _state = {
                        auth:null
                    };
                }

                Store.emitGetSavedSetting();
                break;

            case "setAuthentication":
                _state.auth.context_path = payload.value.context;
                _state.auth.email = payload.value.email;
                _state.auth.api_password = payload.value.api_password;

                QIStrage.set(_state);
                Store.emitChangeAuthentication();
                break;

            case "setMyWorkitemListViewType":
                if(typeof _state.view === "undefined"){
                    _state.view = {};
                }
                _state.view.workitemListViewType = payload.value.listType;
                QIStrage.set(_state);
                Store.emitChangeMyWorkitemListViewType();
                break;
        };
    })
});

module.exports = {
    Action: Action,
    Store: Store,
    ViewType:VIEW_TYPE,
    AppSortTypes:APP_SORT_TYPE
}
