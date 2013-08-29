exports.create = function() {
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.PORTRAIT],
		backgroundColor : '#fff',
		title : 'XING-Gruppe „Webmontag“'
	});
	self.open();
	if (!Ti.App.Xing.isAuthorized()) {
		Ti.App.Xing.authorize();
	}
	return self;
};
