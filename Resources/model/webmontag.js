var WebMon = function() {
	return this;
};

WebMon.prototype.getAll = function(_args) {
	var events = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model/events.json').read().text);
	console.log('Info: ' + events.length + ' events');
	_args.onload(events);
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
