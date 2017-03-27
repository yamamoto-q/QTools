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
    }
};

_state = {
	viewName : "DashBoard"
}

var EVENT = {
	CHANGE_VIEW:"change_view"
}

var VIEW_NAMES = {
	DASHBOARD:"dashboard",
	ADMIN_TOOLS:"admin_tools"
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
    // Dispacher
    dispatcherIndex: dispatcher.register(function(payload) {
        switch (payload.actionType) {
    		case "setView":
    			_state.viewName = payload.value.viewName;
    			Store.emitChangeView();
    			break;
        };
    })
});

module.exports = {
    Action: Action,
    Store: Store,
    ViewNames:VIEW_NAMES
}