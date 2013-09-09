Ti.include('/vendor/oauth.lib.js');
Ti.include('/vendor/oauth.adapter.js');

var supportedSites = {
	twitter : {
		accessToken : "https://api.twitter.com/oauth/access_token",
		requestToken : "https://api.twitter.com/oauth/request_token",
		authorize : "https://api.twitter.com/oauth/authorize?",
		update : "https://api.twitter.com/1.1/statuses/update.json"
	},
	linkedin : {
		accessToken : "https://api.linkedin.com/uas/oauth/accessToken",
		requestToken : "https://api.linkedin.com/uas/oauth/requestToken?scope=rw_nus",
		authorize : "https://api.linkedin.com/uas/oauth/authorize?",
		update : "http://api.linkedin.com/v1/people/~/shares?format=json",
		color : ""
	},
	xing : {
		accessToken : "https://api.xing.com/v1/access_token",
		requestToken : "https://api.xing.com/v1/request_token",
		authorize : "https://api.xing.com/v1/authorize?",
		callback : 'oob',
		color : "#187F7F"
	}
};

var API = function(settings) {
	this.site = settings.site;
	this.adapter = new OAuthAdapter(settings.consumerSecret, settings.consumerKey, "HMAC-SHA1", settings.site);
	this.adapter.loadAccessToken(this.site);
	this.urls = supportedSites[this.site];
	return this;
};

API.prototype.isAuthorized = function() {
	return this.adapter.isAuthorized();
};
API.prototype.deauthorize = function(callback) {
	this.adapter.clearAccessToken(this.site);
	if (!this.adapter.isAuthorized())
		callback && callback(true);
};
API.prototype.authorize = function(callback) {
	var self = this;
	if (!this.adapter.isAuthorized()) {
		function receivePin() {
			self.adapter.getAccessToken(self.urls.accessToken, function(evt) {
				evt.success ? (selfadapter.saveAccessToken(self.site), callback && callback(true)) : alert("Did not get access token now!");
			});
		}


		this.adapter.showLoadingUI(), this.adapter.getRequestToken(this.urls.requestToken, function(evt) {
			evt.success ? self.adapter.showAuthorizeUI(self.urls.authorize + evt.token, receivePin) : alert("Did not get access token now!");
		});
	} else
		callback && callback(true);
};

/* methods of socials: */
API.prototype.shareImage_Twitter = function(options) {
	this.authorize(function() {
		this.adapter.sendTwitterImage({
			params : {
				media : options.image,
				status : options.message,
			},
			onSuccess : options.success,
			onError : options.error
		});
	});
};
API.prototype.share_Twitter = function(options) {
	var self = this;
	this.authorize(function() {
		adapter.send({
			url : self.urls.update,
			parameters : [["status", options.message]],
			onSuccess : options.success,
			onError : options.error
		});
	});
};
API.prototype.share_Linkedin = function(options) {
	var self = this;
	this.authorize(function() {
		adapter.shareLinkedin({
			site : 'linkedin',
			url : self.urls.update,
			parameters : options.message,
			onSuccess : options.success,
			onError : options.error
		});
	});
};

API.prototype.getProfile_Linkedin = function(options) {
	var self = this;
	this.authorize(function() {
		adapter.getProfileLinkedin({
			site : 'linkedin',
			url : self.urls.update,
			parameters : options.message,
			onSuccess : options.success,
			onError : options.error
		});
	});
};
API.prototype.getUserXING = function(_options, _callback) {
	var self = this;
	this.authorize(function() {
		self.adapter.Api({
			url : (_options.user_id) ? 'https://api.xing.com/v1/users/' + _options.user_id : 'https://api.xing.com/v1/users/me',
			method : 'GET'
		}, _callback);
	});
};

module.exports = API;