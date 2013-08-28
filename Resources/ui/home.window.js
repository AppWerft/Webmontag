exports.create = function() {
	var w = Ti.Platform.displayCaps.platformWidth;
	console.log('Info: starting window with ' + w + 'pix');
	var self = Ti.UI.createWindow({
		title : "WebMontag in Hamburg",
		fullscreen : true,
		orientationModes : [Ti.UI.PORTRAIT],
		exitOnClose : true,
		backgroundColor : '#fff'
	});
	var logo = Ti.UI.createView({
		top : 0,
		width : Ti.UI.FILL,
		backgroundImage : '/assets/logo.png',
		height : w / 6.5
	});

	self.open();
	var template = require('ui/templates').events;
	self.listview = Ti.UI.createListView({
		top : w / 6.4,
		templates : {
			'events' : template
		},
		defaultItemTemplate : 'events'
	});
	self.add(self.listview);
	self.listview.addEventListener('itemclick', function(_e) {
		console.log('Info: itemclick received.');
		Ti.Media.vibrate();
		console.log(_e.itemId.length);
		var event = JSON.parse(_e.itemId);
		require('ui/event.window').create(event).open();
	});
	require('ui/home.listview').update(self.listview);
	self.add(logo);
	return self;
}
