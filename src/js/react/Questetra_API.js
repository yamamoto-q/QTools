

var QuestetraAPI = function(){
    var _contextPath;
    var _email;
    var _apiPassword;
    var _credentials;

	function _request(request_url, success, fail, data, dataType, method){
        $.ajax({
                url: _contextPath + request_url,
                type: method,
                data:data,
                dataType: dataType,
                headers: {
                    "Authorization": "Basic " + _credentials
                }
            })
            .done(function(data) {
                if(typeof success === "function"){
                    success(data);
                }
            })
            .fail(function(jqXHR, textStatus) {
                if(typeof fail === "function"){
                    fail(jqXHR, textStatus);
                }
            })
            .always(function() {
                //console.log("complete");
            });
    };

	function _UserQuserSelf(success, fail) {
        _request("API/User/Quser/self", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        });
    }

    // マイタスクの一覧を取得する
    function _PEWorkitemListAllocated(success, fail){
        _request("API/PE/Workitem/listAllocated", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        });
    }

    function _PEWorkitemListOffered(success, fail){
        _request("API/PE/Workitem/listOffered", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        });
    }

    // 組織一覧を取得する
    function _UserQgroupList(success, fail) {
         _request("API/User/Qgroup/list", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        });
    }

    // 組織に所属するメンバ一覧を取得する
    function _UserMembershipListByQgroup(qGroupId, success, fail){
        var sendData = {
            id:qGroupId
        };
        _request("API/User/Membership/listByQgroup", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        },sendData);
    }

    function _AdminSystemAuthorityList(authorityType, success, fail){
        var sendData = {
            type:authorityType
        };
        _request("API/Admin/SystemAuthority/list", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        },sendData);
    }

    function _PEProcessModeListStartable(limit, start, success, fail){
        var sendData = {
            limit:limit,
            start:start,
            _dc:_getTimestamp()
        };
        _request("API/PE/ProcessModel/listStartable", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        },sendData);
    }

    function _PMMProcessModelList(success, fail, limit, start, authorizedOnly){
        var sendData = {
            limit:limit,
            start:start,
            authorizedOnly:authorizedOnly,
            _dc:_getTimestamp()
        };
        _request("API/PMM/ProcessModel/list", function(data){
            success(data);
        },function(jqXHR, textStatus){
            fail(jqXHR, textStatus);
        },sendData);
    }

    function _UserIconView(qUserId, success, fail){
        var oReq = new XMLHttpRequest();
        oReq.open("GET", _contextPath + "User/Icon/view?name=usericon%2f" + qUserId, true);
        oReq.withCredentials = true;
        oReq.setRequestHeader('Authorization', 'Basic ' + _credentials);
        oReq.responseType = "blob";

        oReq.onload = function(oEvent) {
            var blob = oReq.response;
            //console.log(blob.type);

            var reader = new FileReader();
            reader.onloadend = function() {
                if(typeof success === "function"){
                    success(reader.result);
                }
            };
            
            reader.readAsDataURL(blob);
        };

        oReq.send();
    }



    function _getTimestamp(){
        var date = new Date() ;
        return Math.floor( date.getTime() / 1000 ) ;
    }

	return {
		setAuth:function(contextPath, email, apiPassword){
			_contextPath = contextPath;
            _email = email;
            _apiPassword = apiPassword;
            _credentials = btoa(unescape(encodeURIComponent(email + ":" + apiPassword)));

            // console.log(_credentials);
		},
        getContextPath:function(){
            return _contextPath;
        },
        getCredentials:function(){
            return _credentials;
        },
		userQuserSelf:function(success, fail){
			_UserQuserSelf(success, fail);
		},
        PEWorkitemListAllocated:function(success, fail){
            _PEWorkitemListAllocated(success, fail);
        },
        PEWorkitemListOffered:function(success, fail){
            _PEWorkitemListOffered(success, fail);
        },
        UserIconView:function(qUserId, success, fail){
            _UserIconView(qUserId, success, fail);
        },
        UserQgroupList:function(success, fail){
            // 組織一覧を取得する : 全ログインユーザ
            _UserQgroupList(success, fail);
        },
        UserMembershipListByQgroup:function(qGroupId, success, fail){
            // 組織に所属するメンバ一覧を取得する : ユーザ管理権限
            _UserMembershipListByQgroup(qGroupId, success, fail);
        },
        AdminSystemAuthorityList:function(authorityType, success, fail){
            // システム権限の一覧を取得する : システム管理権限
            _AdminSystemAuthorityList(authorityType, success, fail);
        },

        PEProcessModeListStartable:function(success, fail, limit, start){
            this.limit = limit || 1000;
            this.start = start || 0;
            _PEProcessModeListStartable(this.limit, this.start, success, fail);
        },
        PMMProcessModelList:function(success, fail, isAuthorizedOnly, limit, start){
            this.limit = limit || 1000;
            this.start = start || 0;
            this.authorizedOnly = isAuthorizedOnly || false;
            //_dc=1491355791539&authorizedOnly=false&start=0&limit=10
            _PMMProcessModelList(success, fail, this.limit, this.start, this.authorizedOnly);
        }
	};
}

var _QuestetraAPI = QuestetraAPI();

module.exports = {
    API:_QuestetraAPI
}
