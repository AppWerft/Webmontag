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
	var self = this;try {
	if (Ti.App.Properties.hasProperty('total')) {
		var eventsstring = Ti.App.Properties.getString('total'); 
		_callback(JSON.parse(eventsstring));
	}} catch(E) {}
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			console.log(this.responseText);
			var regex = /counter\((.*?)\)/;
			var res = this.responseText.match(regex);
			console.log(res);
			if (res && res[1]) {
				Ti.App.Properties.setString('total', res[1]);
				_callback(res[1]);
			}
			setTimeout(self.getMembersTotal, 300000);
		}
	});
	xhr.open('GET', 'http://transfer.renesasse.com/get_wmhh_count.php?callback=counter');
	xhr.send(null);
};

module.exports = WebMon;
