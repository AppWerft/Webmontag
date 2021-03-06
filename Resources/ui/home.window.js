exports.create = function() {
	var w = Ti.Platform.displayCaps.platformWidth;
	var self = Ti.UI.createWindow({
		title : "WebMontag in Hamburg",
		fullscreen : false,
		orientationModes : [Ti.UI.PORTRAIT],
		exitOnClose : true,
		backgroundColor : '#ddd'
	});
	var logo = Ti.UI.createView({
		top : 0,
		width : Ti.UI.FILL,
		backgroundImage : '/assets/logo.png',
		height : w / 6.5
	});
	var xinglogin = Ti.UI.createImageView({
		image : '/assets/signin.png',
		width : w / 2,
		height : w / 11,
		bottom : 0
	});
	var memberstotal = Ti.UI.createLabel({
		left : '10dp',
		bottom : '10dp',
		color : 'red',
		font : {
			fontSize : '23dp',
			fontFamily : 'KenyanCoffeeRg-Regular'
		}
	});
	logo.add(memberstotal);
	self.open();
	self.listview = Ti.UI.createListView({
		top : w / 6.4,
		bottom : w / 10,
		templates : {
			'events' : require('ui/templates').events
		},
		defaultItemTemplate : 'events'
	});
	self.add(xinglogin);
	self.add(self.listview);
	self.listview.addEventListener('itemclick', function(_e) {
		console.log('Info: itemclick received.');
		var event = JSON.parse(_e.itemId);
		require('ui/event.window').create(event).open();
	});
	require('ui/home.listview').update(self.listview);
	self.add(logo);
	if (Ti.Network.online == false) {
		var dialog = Ti.UI.createAlertDialog({
			message : 'Die App benötigt das Internet.',
			ok : 'Okay',
			title : 'Online'
		}).show();
	}
	xinglogin.addEventListener('click', function() {
		Ti.App.XING.authorize(function(_e) {
			self.listview.bottom = 0;
			xinglogin.hide();
		});
	});
	
	
	
	if (Ti.App.XING.isAuthorized()) {
		xinglogin.hide();
		self.listview.bottom = 0;
		Ti.App.XING.getUserXING({
			onsuccess : function(_e) {
				console.log(_e);
			},
			onerror : function(_e) {
				console.log(_e);
			},
		});
		
	}

	Ti.App.Model.getMembersTotal(function(_total) {
		memberstotal.setText(_total + ' Mitglieder');
	});
	return self;
};
