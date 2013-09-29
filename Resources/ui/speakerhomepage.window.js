exports.create = function(_args) {
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.PORTRAIT],
		backgroundColor : '#fff',
		fullscreen : false
	});
	Ti.App.XING.authorize(function(_e) {
		console.log(_args.hp);
		Ti.App.Model.getXINGProfile(_args, function(_res) {
			if (_res.success == true) {
				var user = _res.data.users[0];
				console.log(user);
				var photo = Ti.UI.createImageView({
					top : 0,
					left : 0,
					image : user.photo_urls.large,
					width : "120dp",
					height : "150dp"
				});
				self.add(photo);
				self.add(Ti.UI.createLabel({
					text : user['display_name'],
					left : "140dp",
					right : "10dp",
					top : "20dp",
					color : '#333',
					font : {
						fontSize : '30	dp',
						fontFamily : 'KenyanCoffeeRg-Regular'
					},
				}));
				var container = Ti.UI.createScrollableView({
					top : '150dp',
					overlayEnabled : true,
					showPagingControl : true
				});
				container.addView(require('ui/speaker.subs').create('Haves', user.haves));
				container.addView(require('ui/speaker.subs').create('Wants', user.wants));
				container.addView(require('ui/speaker.subs').create('Interests', user.interests));
				container.addView(require('ui/speaker.subs').create('Organisations', user['organisation_member']));
				self.add(container);
			} else {
				var dialog = Ti.UI.createAlertDialog({
					message : 'Wie schon erwähnt benötigt die App das Internet. Das XING-Profilist nicht besorgbar.',
					ok : 'Okay',
					title : 'Internet fehlt'
				}).show();
			};
		});
	});
	self.open();
	self.addEventListener('close', function() {
		self.container = null;
		self = null;
	});
};
