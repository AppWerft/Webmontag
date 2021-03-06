var WebMon = function() {
	this.profiles = {};
	return this;
};

WebMon.prototype.getXINGProfile = function(_profile, _callback) {
		var user = ( typeof (_profile) == 'object' && _profile.hp ) ? _profile.hp.split(/\/profiles\//)[1] : _profile;
	console.log('Info: retrieving profile ' + user);
	if (this.profiles[user]) {
		console.log('Info: profile in storage');
		_callback && _callback({
			success : true,
			data : this.profiles[user]
		});
		return;
	}
	var self = this;
	Ti.App.XING.getUserXING({
		user_id : user,
	}, function(_res) {
		if (_res.success === true) {
			console.log('Info: profile stored ' + user);
			self.profiles[user] = _res.data;
			_callback && _callback({
				success : true,
				data : self.profiles[user]
			});
		} else {
			_callback && _callback({
				success : false
			});
		}
	});
};

WebMon.prototype.getAll = function(_args) {
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'EVENTS.json');
	if (file.exists()) {
		try {
			var events = JSON.parse(file.read().text);
			_args.onload(events);
		} catch(E) {
			console.log('Warning: invalide events');
			file.deleteFile();
		}
	}
	var url = 'http://lab.min.uni-hamburg.de/store/webmontag/events.json';
	console.log('Info: starting HTTPClient to get ' + url);
	var actInd = Ti.UI.createActivityIndicator({
		color : 'white',
		backgroundColor : 'black',
		width : '250dp',
		height : '100dp',
		zIndex : 999,
		message : 'Lade Liste …'
	});
	_args.parentview && _args.parentview.add(actInd);
	actInd.show();
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			actInd.hide();
			try {
				var events = JSON.parse(this.responseText);
				console.log('Info: updating events.');
				file.write(this.responseText);
				_args.onload(events);
			} catch(E) {
				console.log('Error: JSON kaputt	' + url + E);
			}
		},
		onerror : function() {
			actInd.hide();
			console.log(this.error);
		}
	});
	xhr.open('GET', url);
	xhr.send(null);
};

WebMon.prototype.getMembersTotal = function(_callback) {
	var self = this;
	try {
		if (_callback && ( typeof (_callback) == 'function') && Ti.App.Properties && Ti.App.Properties.hasProperty('total')) {
			_callback(JSON.parse(Ti.App.Properties.getString('total')));
		}
	} catch(E) {
		console.log(E);
	}
	console.log('Info: try to get new membercount');
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var res = this.responseText.match(/counter\((.*?)\)/);
			if (res && res[1]) {
				Ti.App.Properties.setString('total', res[1]);
				if (_callback && ( typeof (_callback) == 'function'))
					_callback(res[1]);
			}
			setTimeout(self.getMembersTotal, 300000);
		}
	});
	xhr.open('GET', 'http://transfer.renesasse.com/get_wmhh_count.php?callback=counter');
	xhr.send(null);
};

module.exports = WebMon;
