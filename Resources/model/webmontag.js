var WebMon = function() {
	return this;
}

WebMon.prototype.getAll = function(_args) {
	var events = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model/events.json').read().text);
	console.log('Info: ' + events.length + ' events');
	_args.onload(events);
}

module.exports = WebMon;