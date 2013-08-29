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
	var url = 'http://www.webmontag-hamburg.de/events.json';
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			try {
				var events = JSON.parse(this.responseText);
				file.write(this.respinseText);
				_args.onload(events);
			} catch(E) {
			}
		}
	});
	xhr.open('GET', url);
	xhr.send(null);
};

WebMon.prototype.getMembersTotal = function(_callback) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var regex = /counter\((.*?)\)/;
			var res = this.responseText.match(regex);
			if (res)
				_callback(res[1]);
		}
	});
	xhr.open('GET', 'http://transfer.renesasse.com/get_wmhh_count.php?callback=counter');
	xhr.send(null);
};

module.exports = WebMon;
