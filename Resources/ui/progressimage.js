const PATH = 'ImageCache';
exports.create = function(_options) {
	var self = Ti.UI.createImageView();
	for (var k in _options) {
		if (typeof(_options[k]) === 'string' && k !== 'image') {
			self[k] = _options[k];
		}
	}
	self.progress = Ti.UI.createProgressBar({
			bottom : '5dp',height:'30dp',
			width : '90%',min:0,max:1
	});
	self.add(self.progress);
	var file =Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,PATH,Ti.Utils.md5HexDigest(_options.image));
	if(file.exists()) 
		self.setImage(file.nativePath) 
	else {	self.progress.show();console.log('Info: start caching: ' + _options.image);
			var dir=Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,PATH);
			dir.exists()||dir.createDirectory();
			var client = Ti.Network.createHTTPClient({
			ondatastream: function(_e){self.progress.setValue(_e.progress);},onload : function() {
				
			  if (this.status===200) {
			  	self.progress.hide();
			  	file.write(this.responseData),self.setImage(file.nativePath);
			  };
			}});
			client.open("GET",_options.image);
			client.send();
	};
	return self;
};
