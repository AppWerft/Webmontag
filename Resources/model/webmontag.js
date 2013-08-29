var WebMon = function() {
	return this;
};

WebMon.prototype.getAll = function(_args) {
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'events.json');
	if (file) {
		try {
			var events = JSON.parse(file.read().text);
			_args.onload(events);
		} catch(E) {
			console.log('Warning: invalide events');
		}
	}
	var url = 'http://www.webmontag-hamburg.de/events.json';
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			try {
				var events = JSON.parse(this.responseText);
				file.write(this.responseText);
				_args.onload(events);
			} catch(E) {
			}
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
