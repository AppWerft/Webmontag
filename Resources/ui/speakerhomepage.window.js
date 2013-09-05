exports.create = function(_args) {
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.PORTRAIT],
		backgroundColor : '#fff'
	});

	if (Ti.App.XING.isAuthorized()) {
		var user = _args.hp.split(/\/profiles\//)[1];
		Ti.App.XING.getUser({
			user_id : user,
			onsuccess : function(_e) {
				console.log(_e);
			}
		});
	} else {
		var web = Ti.UI.createWebView({
			url : _args.hp
		});
		self.add(web);

	}
	self.open();

};
