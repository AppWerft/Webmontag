var pt = Titanium.Platform.displayCaps.platformWidth*0.068;
exports.events = {
	properties : {
		height : '100dp',
		backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'logo',
		properties : {
			height : Ti.UI.SIZE,
			bubbles : true,
			width : '90dp',
			left : 0
		},
		events : {
			click : function() {
			}
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		events : {
			click : function() {
			}
		},
		properties : {
			color : '#333',
			height : Ti.UI.SIZE,
			font : {
				fontSize : pt,
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			left : '95dp',
			width : Ti.UI.FILL,
			top : '5dp',
			right : '20dp'
		},
	}, {
		type : 'Ti.UI.Label',
		bindId : 'subtitle',
		events : {
			click : function() {
			}
		},
		properties : {
			color : '#666',
			height : Ti.UI.SIZE,
			bubbles : true,
			font : {
				fontSize : '16dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			width : Ti.UI.FILL,
			bottom : '5dip',
			left : "95dp"
		},
	}]

};

exports.session = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'logo',
		events : {
			click : function() {
			}
		},
		properties : {
			height : Ti.UI.SIZE,
			width : '90dp',
			left : 0,
			top : '5dp'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		events : {
			click : function() {
			}
		},
		properties : {
			color : '#666',
			height : '60dp',
			font : {
				fontSize : (Ti.Android) ? '23dp' : 19,
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			left : "100dp",
			width : Ti.UI.FILL,
			bubbles : true,
			top : '5dp',
			right : '15dp'
		},
	}, {
		type : 'Ti.UI.Label',
		bindId : 'subtitle',
		events : {
			click : function() {
			}
		},
		properties : {
			color : '#666',
			right : '20dp',
			height : Ti.UI.SIZE,
			font : {
				fontSize : '16dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			width : Ti.UI.FILL,
			top : '65dp',
			left : "100dp"
		},
	}]

};
