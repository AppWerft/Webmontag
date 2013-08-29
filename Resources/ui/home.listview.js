exports.update = function(_listview) {
	var sections = [];
	Ti.App.Model.getAll({
		onload : function(_data) {
			var items = [];
			for (var i = 0; i < _data.events.length; i++) {
				if (_data.events[i].title.length)
					items.push({
						template : 'events',
						title : {
							text : _data.events[i].title
						},
						subtitle : {
							text : _data.events[i].datelong
						},
						logo : {
							image : _data.events[i].logo
						},
						properties : {
							//	selectionStyle : TiTi.UI.iPhone.ListViewCellSelectionStyle.NONE,
							allowsSelection : true,
							itemId : JSON.stringify(_data.events[i]),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
						}
					});
			}

			sections[0] = Ti.UI.createListSection({
				items : items
			});
			_listview.setSections(sections);
		}
	});
};
