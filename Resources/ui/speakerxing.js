var speakers = {
	"Martin Dombrowski" : "Martin_Dombrowski",
	"Reinher Karl" : "Reinher_Karl",
	"Martin Fuchs" : "Martin_Fuchs",
	"Catherine Hoffmann" : "Catherine_Hoffmann",
	"Tilo Timmermann" : "Tilo_Timmermann"
};

exports.create = function(_speaker) {
	var self = Ti.UI.createWindow();
	var web = Ti.UI.createWebView({
		url : 'https://www.xing.com/profiles/' + _speaker.replace(/\s/g,'_')
	});
	self.add(web);
	return self;
};

