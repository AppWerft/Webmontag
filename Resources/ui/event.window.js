const H = '140dp', W = '200dp';
exports.create = function(_event) {
	var w = Ti.Platform.displayCaps.platformWidth;
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.PORTRAIT],
		title : _event.title,
		fullscreen : true,
		backgroundColor : '#fff'
	});

	var template = require('ui/templates').session;
	self.listview = Ti.UI.createListView({
		top : (_event.gallery && _event.gallery.length) ? H : 0,
		templates : {
			'session' : template
		},
		defaultItemTemplate : 'session'
	});
	self.add(self.listview);
	if (_event.sessions) {
		var items = [], sections = [];
		for (var i = 0; i < _event.sessions.length; i++) {
			var session = _event.sessions[i];
			items.push({
				template : 'session',
				title : {
					text : session.title
				},
				subtitle : {
					text : session.shorttext
				},
				logo : {
					image : session.image
				},
				properties : {
					//allowsSelection : true,
					accessoryType : (session.mp4) ? Ti.UI.LIST_ACCESSORY_TYPE_DETAIL : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
					itemId : (session.mp4) ? JSON.stringify(session) : {}
				}
			});
		}
		sections[0] = Ti.UI.createListSection({
			items : items
		});
		self.listview.setSections(sections);
	}
	self.listview.addEventListener('itemclick', function(_e) {
		require('ui/video.widget').create(JSON.parse(_e.itemId));
	});
	setTimeout(function() {
		if (_event.gallery && _event.gallery.length) {
			var gal = require('ui/gallery').create(_event, W, H);
			self.add(gal);
			gal.addEventListener('dragend', function() {
				if (photograph)
					photograph.animate(Ti.UI.createAnimation({
						opacity : 0,
						duration : 2000
					}));
			});
		}
	}, 100);
	var photograph = undefined;
	if (_event.photograph && _event.gallery && _event.gallery.length) {
		photograph = Ti.UI.createLabel({
			text : '\nPhotograph:\n' + _event.photograph,
			top : H - 1,
			color : 'white',height:H,
			shadowOffset : {
				x : '2dp',
				y : '2dp'
			},
			touchEnabled : false,
			shadowColor : 'gray',
			opacity : 0.6,
			zIndex : 999,
			font : {
				fontSize : '36dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			left : '20dp'
		});
		self.add(photograph);
	}self.addEventListener('longpress', function() {
			self.close();
		});
	return self;
};
