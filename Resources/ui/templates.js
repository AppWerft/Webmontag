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
			width : '90dp',
			left : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#666',
			height : Ti.UI.SIZE,
			font : {
				fontSize : '23dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			left : "100dp",
			width : Ti.UI.FILL,
			top : '5dp',
			right : '15dp'
		},
	}, {
		type : 'Ti.UI.Label',
		bindId : 'subtitle',
		properties : {
			color : '#666',
			height : Ti.UI.SIZE,
			font : {
				fontSize : '16dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			width : Ti.UI.FILL,
			bottom : '5dip',
			left : "100dp"
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
		properties : {
			height : Ti.UI.SIZE,
			width : '90dp',
			left : 0,
			top : '5dp'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#666',
			height : '60dp',
			font : {
				fontSize : '23dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
			left : "100dp",
			right : '20dp',
			width : Ti.UI.FILL,
			top : '5dp',
			right : '15dp'
		},
	}, {
		type : 'Ti.UI.Label',
		bindId : 'subtitle',
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