/**
 * @class xingapi
 *
 * - Logging into XING and authorizing the application through the OAuth protocol.
 *
 *
 * To use the XING library, require it with the `vendor` root
 * directory in your `require` call. For example:
 *
 *     var XING = require('vendor/xingapi').create({
 *         consumerSecret: 'consumer-secret',
 *         consumerKey: 'consumer-key'
 *     });
 *
 * ## Login and Authorization
 *
 * To use a social media provider, a user must log in and authorize the application to perform
 * certain actions, such as accessing profile information or posting messages.
 *
 * Call `authorize` to prompt the user to login and authorize the application.  For XING a
 * dialog box will appear asking the user for their permission and login credentials.
 *
 * Before calling `authorize`, the application will need a consumer key and secret provided by the
 * social media service provider for the OAuth protocol, used when calling `create`.
 *
 * LinkedIn https://gist.github.com/vyatri/6094282
 */
const ENDPOINT = 'https://api.xing.com/v1';

Ti.include('/vendor/oauth.js');

var OAuthAdapter = function(pConsumerSecret, pConsumerKey, pSignatureMethod) {
	function showLoading() {
		if (loading)
			return;
		loading = !0, loadingView.value = 0, estimateID = firstLoad ? "tokenRequest" : "pageLoad", estimates[estimateID] || (estimates[estimateID] = firstLoad ? 2e3 : 1e3), firstLoad = !1, startTime = (new Date).getTime(), intervalID = setInterval(updateProgress, 30), webView && webView.hide(), loadingView && loadingView.show(), loadingContainer && loadingContainer.show();
	}

	function updateProgress() {
		loadingView && (loadingView.value = ((new Date).getTime() - startTime) / estimates[estimateID]);
	}

	function authorizeUICallback(e) {
		var response = e.source.evalJS('(p = document.getElementById("verifier")) && p.innerHTML;');
		console.log(response);
		response ? ( pin = response, destroyAuthorizeUI(), receivePinCallback()) : (loadingView && loadingView.hide(), loadingContainer && loadingContainer.hide(), webView && webView.show()), loading = !1, clearInterval(intervalID), estimates[estimateID] = (new Date).getTime() - startTime, Ti.App.Properties.setString("Social-LoadingEstimates", JSON.stringify(estimates));
	}

	var consumerSecret = pConsumerSecret, consumerKey = pConsumerKey, signatureMethod = pSignatureMethod, pin = null, requestToken = null, requestTokenSecret = null, accessToken = null, accessTokenSecret = null, accessor = {
		consumerSecret : consumerSecret,
		tokenSecret : ""
	}, window = null, view = null, webView = null, loadingView = null, loadingContainer = null, receivePinCallback = null, accessTokenStore = {};
	this.loadAccessToken = function(pService) {
		var token;
		if (accessTokenStore[pService])
			token = accessTokenStore[pService];
		else {
			var raw = Ti.App.Properties.getString("Social.js-AccessToken-" + pService, "");
			if (!raw)
				return;
			try {
				token = accessTokenStore[pService] = JSON.parse(raw);
			} catch (err) {
				Ti.API.error("Failed to parse stored access token for " + pService + "!"), Ti.API.error(err);
				return;
			}
		}
		token.accessToken && ( accessToken = token.accessToken), token.accessTokenSecret && ( accessTokenSecret = token.accessTokenSecret);
	}, this.saveAccessToken = function(pService) {
		accessTokenStore[pService] = {
			accessToken : accessToken,
			accessTokenSecret : accessTokenSecret
		}, Ti.App.Properties.setString("Social.js-AccessToken-" + pService, JSON.stringify(accessTokenStore[pService]));
	}, this.clearAccessToken = function(pService) {
		delete accessTokenStore[pService], Ti.App.Properties.setString("Social.js-AccessToken-" + pService, null), accessToken = null, accessTokenSecret = null;
	}, this.isAuthorized = function() {
		return accessToken != null && accessTokenSecret != null;
	};
	var createMessage = function(pUrl) {
		var message = {
			action : pUrl,
			method : "POST",
			parameters : []
		};
		return message.parameters.push(["oauth_callback", "oob"]), message.parameters.push(["oauth_consumer_key", consumerKey]), message.parameters.push(["oauth_signature_method", signatureMethod]), message;
	};
	this.getPin = function() {
		return pin;
	};
	this.getRequestToken = function(pUrl, callback) {
		accessor.tokenSecret = "";
		var message = createMessage(pUrl);
		OAuth.setTimestampAndNonce(message), OAuth.SignatureMethod.sign(message, accessor);
		var done = !1, client = Ti.Network.createHTTPClient({
			onload : function() {
				var responseParams = OAuth.getParameterMap(this.responseText);
				requestToken = responseParams.oauth_token, requestTokenSecret = responseParams.oauth_token_secret, callback({
					success : !0,
					token : this.responseText
				}), done = !0;
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to getRequestToken!"), Ti.API.error(this.responseText), callback({
					success : !1
				}), done = !0;
			}
		});
		client.open("POST", pUrl), client.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'), client.send(OAuth.getParameterMap(message.parameters));
	};
	var destroyAuthorizeUI = function() {
		if (window == null)
			return;
		try {
			webView.removeEventListener("load", authorizeUICallback), webView.removeEventListener("beforeload", showLoading), loadingView.hide(), window.close(), loading = null, webView = null, loadingView = null, loading = !1, firstLoad = !0, view = null, window = null;
		} catch (ex) {
			Ti.API.debug("Cannot destroy the authorize UI. Ignoring.");
		}
	}, firstLoad = !0, loading = !1, estimates = JSON.parse(Ti.App.Properties.getString("Social-LoadingEstimates", "{}")), estimateID, startTime, intervalID = 0;
	this.showLoadingUI = function() {
		window = Ti.UI.createWindow({
			backgroundColor : "transparent",
			zIndex : 1e3
		}), Ti.Android || (window.opacity = 0, window.transform = Ti.UI.create2DMatrix().scale(0)), view = Ti.UI.createView({
			top : 5,
			right : 5,
			bottom : 5,
			left : 5,
			backgroundColor : "#1A7576",
			border : 1,
			borderColor : "#1A7576",
			borderRadius : 10,
			borderWidth : 5,
			zIndex : -1
		});
		var closeLabel = Ti.UI.createButton({
			font : {
				fontSize : 11,
				fontWeight : "bold"
			},
			backgroundColor : "#1A7576",
			borderColor : "#1A7576",
			color : "#fff",
			style : 0,
			borderRadius : 6,
			title : "⨉",
			top : '8dp',
			right : '8dp',
			width : '30dp',
			height : '30dp'
		});
		closeLabel.addEventListener("click", destroyAuthorizeUI), window.open();
		var offset = 0;
		Ti.Android && ( offset = "10dp"), loadingContainer = Ti.UI.createView({
			top : offset,
			right : offset,
			bottom : offset,
			left : offset,
			backgroundColor : "#fff"
		}), loadingView = Ti.UI.createProgressBar({
			top : 10,
			right : 10,
			bottom : 10,
			left : 10,
			min : 0,
			max : 1,
			value : .5,
			message : "Loading, please wait.",
			backgroundColor : "#fff",
			font : {
				fontSize : 14,
				fontWeight : "bold"
			},
			style : 0
		}), view.add(loadingContainer), loadingContainer.add(loadingView), loadingView.show(), window.add(view);

		if (!Ti.Android) {
			window.add(closeLabel);
			var tooBig = Ti.UI.createAnimation({
				transform : Ti.UI.create2DMatrix().scale(1.1),
				opacity : 1,
				duration : 350
			}), shrinkBack = Ti.UI.createAnimation({
				transform : Ti.UI.create2DMatrix(),
				duration : 400
			});
			tooBig.addEventListener("complete", function() {
				window.animate(shrinkBack);
			}), window.animate(tooBig);
		}
		showLoading();
	};
	this.showAuthorizeUI = function(pUrl, pReceivePinCallback) {
		receivePinCallback = pReceivePinCallback;
		var offset = 10;
		Ti.Android && ( offset = "10dp"), webView = Ti.UI.createWebView({
			url : pUrl,
			top : offset,
			right : offset,
			bottom : offset,
			left : offset,
			autoDetect : [Ti.UI.AUTOLINK_NONE]
		}), webView.addEventListener("beforeload", showLoading), webView.addEventListener("load", authorizeUICallback), view.add(webView);
	};
	this.getAccessToken = function(pUrl, callback) {
		accessor.tokenSecret = requestTokenSecret;
		var message = createMessage(pUrl);
		message.parameters.push(["oauth_token", requestToken]), message.parameters.push(["oauth_verifier", pin]), OAuth.setTimestampAndNonce(message), OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters), client = Ti.Network.createHTTPClient({
			onload : function() {
				var responseParams = OAuth.getParameterMap(this.responseText);
				console.log(responseParams);
				accessToken = responseParams.oauth_token, accessTokenSecret = responseParams.oauth_token_secret, callback({
					success : !0
				});
			},
			onerror : function() {
				Ti.API.error("Social.js: FAILED to getAccessToken!"), Ti.API.error(this.responseText), callback({
					success : !1
				});
			}
		});
		client.open("POST", pUrl), client.send(parameterMap);
	};
	this.send = function(options, callback) {
		var method = (options.method) ? options.method : 'POST';
		var pUrl = options.url, pParameters = options.parameters, pTitle = options.title, pSuccessMessage = options.onSuccess, pErrorMessage = options.onError;
		if (accessToken == null || accessTokenSecret == null) {
			Ti.API.debug("The send status cannot be processed as the client doesn't have an access token. Authorize before trying to send.");
			return;
		}
		accessor.tokenSecret = accessTokenSecret;
		var message = createMessage(pUrl);
		message.parameters.push(["oauth_token", accessToken]);
		message.parameters.push(["oauth_version", "1.0"]);
		for (p in pParameters)
		message.parameters.push(pParameters[p]);
		OAuth.setTimestampAndNonce(message), OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters);
		var header = OAuth.getAuthorizationHeader("https://api.xing.com/", message.parameters);
		var url = pUrl + '.json?';// + OAuth.formEncode(message.parameters);
		var client = Ti.Network.createHTTPClient({
			onload : function() {
				console.log('Load: ' + this.status);
				console.log('Load: ' + this.responseText);
				client.status == 200 ? pSuccessMessage && pSuccessMessage(this.responseText) : pErrorMessage && pErrorMessage(this.responseText);
			},
			onerror : function() {
				console.log('Error: ' + this.status);
				console.log('Error: ' + this.responseText);
			}
		});
		client.open(method, url);
		client.setRequestHeader('User-Agent', 'OAuth1.0 Plugin for Titanium (adapted by Hamburger AppWerft)');
		//if (options.json == true) {
		client.setRequestHeader('Accept-Header', 'application/json');
		//	}
		client.setRequestHeader("Authorization", header);
		client.setRequestHeader("X-Requested-With","XMLHttpRequest");
		//	if (method == 'POST' || method == 'PUT') {
		client.setRequestHeader('Content-Type', 'application/json');
		client.send({});
		//} else client.send(null);

		console.log(method + ': ' + url);
		console.log('Authorization: ' + header);
	//	console.log('Body: ' + parameterMap);
	};
	var self = this;
	this.get = function(options, callback) {
		options.method = 'GET';
		options.url = ENDPOINT + options.url;
		options.json = true;
		self.send(options, callback);
	};
	this.post = function(options, callback) {
		options.method = 'POST';
		options.url = ENDPOINT + options.url;
		options.json = true;
		self.send(options, callback);
	};

}, supportedSites = {
	xing : {
		accessToken : ENDPOINT + "/access_token",
		requestToken : ENDPOINT + "/request_token",
		authorize : ENDPOINT + "/authorize?"
	}
};

exports.create = function(settings) {
	var site = 'xing';
	var urls = {
		accessToken : ENDPOINT + "/access_token",
		requestToken : ENDPOINT + "/request_token",
		authorize : ENDPOINT + "/authorize?"
	};
	var adapter = new OAuthAdapter(settings.consumerSecret, settings.consumerKey, "HMAC-SHA1");
	adapter.loadAccessToken(site);
	return {
		isAuthorized : function() {
			return adapter.isAuthorized();
		},
		deauthorize : function() {
			adapter.clearAccessToken(site);
		},
		authorize : function(callback) {
			if (!adapter.isAuthorized()) {
				function receivePin() {
					adapter.getAccessToken(urls.accessToken, function(evt) {
						evt.success ? (adapter.saveAccessToken(site), callback && callback({
						})) : alert("XING did not give us an access token!");
					});
				}
				adapter.showLoadingUI(), adapter.getRequestToken(urls.requestToken, function(evt) {
					console.log(evt);
					evt.success ? adapter.showAuthorizeUI(urls.authorize + evt.token, receivePin) : alert("XING did not give us a request token!");
				});
			} else
				callback && callback();
		},
		getUser : function(_options) {
			this.authorize(function() {
				adapter.get({
					url : (_options.user_id) ? '/users/' + _options.user_id : '/users/me',
				}, function() {
				});
			});
		}
	};
};
