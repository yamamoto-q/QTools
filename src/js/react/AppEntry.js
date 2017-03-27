'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var QTools = require('./QTools.js');
var BuildInfo = require('./BuildInfo.js');

(function ($) {
	console.log("ver." + BuildInfo.VERSION);
	// cordova 判定
	/*
 if(typeof cordova !== "undefined"){
 	console.log(cordova);
 }
 */
	var isMonaca = false;
	var isDeviceready = false;
	var isFiredRender = false;

	if (typeof monaca !== "undefined") {
		isMonaca = true;
		document.addEventListener('deviceready', function () {
			isDeviceready = true;
			onDeviceReady();
		}, false);
	}
	$(document).ready(function () {
		onDeviceReady();
	});

	function onDeviceReady() {
		if (isMonaca && isDeviceready && !isFiredRender) {
			fireRender();
			return;
		} else if (!isFiredRender) {
			fireRender();
		}
	}

	function fireRender() {
		isFiredRender = true;

		ReactDOM.render(React.createElement(
			QTools,
			null,
			'Entry'
		), document.getElementById('App'));
	};
})(window.jQuery);
