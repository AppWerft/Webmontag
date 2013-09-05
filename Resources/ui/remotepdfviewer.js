exports.createPDFViewer = function(_event, _progresswidget) {
	var getFromCache = function(_pdf, _onload) {
		var pdffile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Ti.Utils.md5HexDigest(_pdf) + '.slides');
		if (pdffile.exists()) {
			_progresswidget.hide();
			_onload(pdffile);
		} else {
			var xhr = Ti.Network.createHTTPClient({
				onload : function() {
					console.log(this.status);
					_progresswidget.hide();
					pdffile.write(this.responseData);
					_onload(pdffile);
				},
				onerror : function() {
					console.log(this.error);
				},
				ondatastream : function(_e) {
					_progresswidget.progress.value = _e.progress;
				}
			});
			xhr.open('GET', _pdf);
			xhr.send(null);
		}
	};
	getFromCache(_event.slides, function(_appFile) {
		if (Ti.Filesystem.isExternalStoragePresent()) {
			var filenameBase = new Date().getTime();
			tmpFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filenameBase + '.webmontag.pdf');
			tmpFile.write(_appFile.read());
			if (tmpFile.exists()) {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_VIEW,
					type : "application/pdf",
					data : tmpFile.getNativePath()
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
