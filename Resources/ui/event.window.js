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
			var session = _event.sessions[i]
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
					allowsSelection : true,
					accessoryType : (session.mp4) ? Ti.UI.LIST_ACCESSORY_TYPE_DETAIL : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
					itemId : (session.mp4) ? session.mp4 : null
				}
			});
		}
		console.log(items);
		sections[0] = Ti.UI.createListSection({
			items : items
		});
		self.listview.setSections(sections);
	}
	self.listview.addEventListener('itemclick', function(_e) {
		console.log(_e.itemId);
		if (_e.itemId) {
			var url = _e.itemId;
			console.log(url);
			var win = Ti.UI.createWindow({
				orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT]
			});
			var videoplayer = Ti.Media.createVideoPlayer({
				autoplay : true,
				fullscreen : true,
				orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT],
				url : url,
				mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode : Ti.Media.VIDEO_SCALING_FIT
			});
			win.add(videoplayer);
			videoplayer.addEventListener('complete', function(e) {
				if (e.reason == 0) {
					win.close();
				};
			});
			videoplayer.addEventListener('fullscreen', function(e) {
				if (e.entering == 0) {
					win.close();
				};
			});
		}
	});
	console.log('Info: eventwindow ready');
	setTimeout(function() {
		if (_event.gallery && _event.gallery.length)
			self.add(require('ui/gallery').create(_event, W, H));
	}, 100);
	if (_event.photograph && _event.gallery && _event.gallery.length)
		self.add(Ti.UI.createLabel({
			text : '\nPhotograph:\n' + _event.photograph,
			top : H - 20,
			color : 'white',
			opacity : 0.6,
			zIndex : 999,
			font : {
				fontSize : '24dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			left : '20dp'
		}));
	return self;
}
