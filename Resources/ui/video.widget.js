exports.create = function(_args) {
	if (Ti.Network.online == false || !_args.mp4)
		return;
	var win = Ti.UI.createWindow({
		backgroundColor : 'white',
		orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT]
	});
	var style;
	if (Ti.Platform.name === 'iPhone OS') {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
		style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	var activityIndicator = Ti.UI.createActivityIndicator({
		color : 'green',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 26,
			fontWeight : 'bold'
		},
		message : 'Loading...',
		style : style,
		top : 10,
		left : 10,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});
	var videoplayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		fullscreen : true,
		backgroundColor : '#333',
		orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT],
		url : _args.mp4,
		mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Ti.Media.VIDEO_SCALING_FIT
	});
	win.add(activityIndicator);
	videoplayer.addEventListener('preload', function() {
		win.add(videoplayer);
	});
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
};
