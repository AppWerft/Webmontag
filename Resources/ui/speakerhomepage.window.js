exports.create = function(_args) {
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.PORTRAIT],
		backgroundColor : '#fff',
	});
	var web = Ti.UI.createWebView({
		url : _args.hp
	});
	self.add(web);
	self.open();
	
};
