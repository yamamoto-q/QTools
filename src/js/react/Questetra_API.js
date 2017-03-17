

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

	return {
		setAuth:function(contextPath, email, apiPassword){
			_contextPath = contextPath;
            _email = email;
            _apiPassword = apiPassword;
            _credentials = btoa(unescape(encodeURIComponent(email + ":" + apiPassword)));

            console.log(_credentials);
		},
		userQuserSelf:function(success, fail){
			_UserQuserSelf(success, fail);
		}
	};
}

var _QuestetraAPI = QuestetraAPI();

module.exports = {
    API:_QuestetraAPI
}
