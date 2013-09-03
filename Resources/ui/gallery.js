exports.create = function(_event, _W, _H) {
	var self = Ti.UI.createScrollView({
		left : 0,
		backgroundColor : '#777',
		height : _H,
		horizontalWrap : false,
		showHorizontalScrollIndicator : false,
		showVerticalScrollIndicator : true,
		layout : 'horizontal',
		scrollType : 'horizontal',
		top : 0,
		width : Ti.UI.FILL,
		contentWidth : Ti.UI.SIZE,
	});
	if (_event.gallery && _event.gallery.length) {
		for (var i = 0; i < _event.gallery.length; i++) {
			var mini = require('ui/progressimage').create({
				image : 'http://www.webmontag-hamburg.de/tl_files/galerie/' + _event.gallery[i],
				defaultImage : '/assets/logobg.png',
				width : _W,
				left : 0,
				top : 0,
				height : _H
			});
			self.add(mini);
		}
	}
	self.addEventListener('click', function() {
		var win = Ti.UI.createWindow({
			fullscreen : true,
			title : 'Webmontag ' + _event.datelong + ',  Photograph:' + _event.photograph,
			orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT]
		});
		win.open();
		var views = [];
		for (var i = 0; i < _event.gallery.length; i++) {
			views.push(Ti.UI.createImageView({
				image : 'http://www.webmontag-hamburg.de/tl_files/galerie/' + _event.gallery[i]
			}));
		}
		var container = Ti.UI.createScrollableView({
			views : views
		});
		win.add(container);
		win.addEventListener('longpress', function() {
			win.close();
		});
	});
	return self;
};
