exports.create = function(_title, _data) {
	console.log(_data);
	var self = Ti.UI.createView({
		layout : 'vertical'
	});
	self.add(Ti.UI.createLabel({
		left : 20,
		right : 20,
		top : '20dp',font : {
				fontSize : '27dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
		color : '#187F7F',
		text : _title
	}));
	self.add(Ti.UI.createLabel({
		left : 20,
		right : 20,
		top : 20,font : {
				fontSize : '18dp',
				fontFamily : 'KenyanCoffeeRg-Regular'
			},
		color : 'black',
		text : JSON.stringify(_data)
	}));
	return self;
};
