exports.createPDFViewer = function(_pdf) {
	var getFromCache = function(_pdf, _onload) {
		var pdffile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Ti.Utils.md5HexDigest(_pdf) + '.pdf');
		if (pdffile.exists()) {
			_onload(pdffile);
		} else {
			var xhr = Ti.Network.createHTTPClient({
				onload : function() {
					console.log(this.status);
					pdffile.write(this.responseText);
					_onload(pdffile);
				},
				onerror : function() {
					console.log(this.error);
				},
				ondatastream : function(_e) {
					console.log(_e.progress);
				}
			});
			xhr.open('GET', _pdf);
			xhr.send(null);
		}
	};
	getFromCache(_pdf, function(_appfile) {
		if (Ti.Filesystem.isExternalStoragePresent()) {
			var filenameBase = new Date().getTime();
			tmpFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filenameBase + '.pdf');
			tmpFile.write(_appFile.read());
			if (tmpFile.exists()) {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_VIEW,
					type : "application/pdf",
					data : tmpFile.nativePath
				});
				try {
					Ti.Android.currentActivity.startActivity(intent);
				} catch(e) {
					Ti.API.debug(e);
					alert('No apps PDF apps installed!');
				}
			} else {
				Ti.API.info('starting intent tmpFile exists: ' + tmpFile.exists());
				alert('Our file disappeared!');
			}
		}
	});
	return;
};
