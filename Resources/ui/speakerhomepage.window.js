exports.create = function(_args) {
	var self = Ti.UI.createWindow({
		orientationModes : [Ti.UI.PORTRAIT],
		backgroundColor : '#fff'
	});
	Ti.App.MultiSocial.authorize(function(_e) {
		console.log(_args.hp);
		Ti.App.Model.getXINGProfile(_args, function(_res) {
			console.log(_res);
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
				var row = Ti.UI.createTableViewRow();
				row.add(Ti.UI.createLabel({
					text : JSON.stringify(user),
					left : 20,
					right : 10,
					color : '#222',
					top : 0,
					font : {
						fontSize : '18dp',
						fontFamily : 'Helvetica'
					},
				}));
				var tv = Ti.UI.createTableView({
					top : "150dp"
				});
				self.add(tv);
				tv.appendRow(row);
			};
		});
	});
	self.open();
};
