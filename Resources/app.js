// Toni   d98b399c4bbb9e78b35d7aad753ef344ed60dea5

(function() {
	console.log('Info: Starting App ============================');
	Ti.UI.orientation = Ti.UI.PORTRAIT;
	var Webmontag = require('model/webmontag');
	Ti.App.Model = new Webmontag();
	var SocialModul = require('vendor/multisocial.api');
	Ti.App.XING = new SocialModul({
		site : "xing",
		consumerSecret : Ti.App.Properties.getString('xing.appsecret'),
		consumerKey : Ti.App.Properties.getString('xing.appid')
	});	
	require('ui/home.window').create();
})();

/*

 scp /Users/rainerschleevoigt/Documents/TitaniumStudioWorkspace/Webmontag/build/android/bin/app.apk ra1n3r@webmasterei.com:/mume/webmontag.apk
 
 https://shib.stine.uni-hamburg.de/idp/Authn/UserPassword
 https://uhh-srv-olatweb.rrz.uni-hamburg.de/olat/dmz/

 */