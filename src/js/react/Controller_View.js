var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();

var Action = {
    setView:function(viewName){
        dispatcher.dispatch({
            actionType: "setView",
            value: {
                viewName:viewName
            }
        });
    },
    historyBack:function(){
        dispatcher.dispatch({
            actionType: "historyBack",
            value: {}
        });
    },
    setHasHeader:function(bool){
        dispatcher.dispatch({
            actionType: "setHasHeader",
            value: {
                flag:bool
            }
        });
    },
    setHasFooter:function(bool){
        dispatcher.dispatch({
            actionType: "setHasFooter",
            value: {
                flag:bool
            }
        });
    },
};

var EVENT = {
	CHANGE_VIEW:"change_view"
}

var VIEW_NAMES = {
	DASHBOARD:"dashboard",
	ADMIN_TOOLS:"admin_tools"
}

var _state = {
	viewName : VIEW_NAMES.DASHBOARD,
    history:[],
    hasHeader: false,
    hasFooter:false
}

var Store = assign({}, EventEmitter.prototype, {
	getViewNane:function(){
		return _state.viewName;
	},
	//
	addChangeViewListener:function(callback){
        this.on(EVENT.CHANGE_VIEW, callback);
    },
    emitChangeView:function(){
        this.emit(EVENT.CHANGE_VIEW);
    },
    // func
    _setView:function(viewName, addHistry){
        if(addHistry){
            _state.history.push({
                viewName:_state.viewName
            });
        }

    	_state.viewName = viewName;
    	Store.emitChangeView();
    },
    // Dispacher
    dispatcherIndex: dispatcher.register(function(payload) {
        switch (payload.actionType) {
    		case "setView":
    			Store._setView(payload.value.viewName, true);
    			break;
            case "historyBack":
                var before = _state.history.pop();
                var viewName = before.viewName;
                if(typeof viewName !== "undefined"){
                    Store._setView(viewName, false);
                }
                break;

            case "setHasHeader":
                var flag = payload.value.flag;
                _state.hasHeader = flag;
                if(flag){
                    $("body").addClass('has-header');
                }else{
                    $("body").removeClass('has-header')
                }
                break;

            case "setHasFooter":
                var flag = payload.value.flag;
                _state.hasFooter = flag;
                if(flag){
                    $("body").addClass('has-footer');
                }else{
                    $("body").removeClass('has-footer')
                }
                break;
        };
    })
});

module.exports = {
    Action: Action,
    Store: Store,
    ViewNames:VIEW_NAMES
}