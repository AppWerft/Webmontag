// Toni   d98b399c4bbb9e78b35d7aad753ef344ed60dea5

(function() {
	console.log('Info: Starting App ============================');
	Ti.UI.orientation = Ti.UI.PORTRAIT;
	var Webmontag = require('model/webmontag');
	Ti.App.Model = new Webmontag();
	var MS = require('vendor/multisocial.api');
		
	Ti.App.MultiSocial = new MS({
		site : "xing",
		consumerSecret : Ti.App.Properties.getString('xing.appsecret'),
		consumerKey : Ti.App.Properties.getString('xing.appid')
	});
	require('ui/home.window').create();
})();

/*

 scp /Users/fuerst/Documents/Titanium\ Studio\ Workspace/lecture2go/build/iphone/build/Debug-iphoneos/*.ipa ra1n3r@webmasterei.com:/hausweb/tools/l2g

 https://shib.stine.uni-hamburg.de/idp/Authn/UserPassword
 https://uhh-srv-olatweb.rrz.uni-hamburg.de/olat/dmz/

 */