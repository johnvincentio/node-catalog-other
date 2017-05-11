const truck_category_package_itemsSchema = mongoose.Schema({
	_id: {type: Number, required: true},
	package_id: {type: Number, required: true},
	display_text: {type: String, required: true},
	seo_name: {type: String, required: false},
	default_count: {type: Number, required: false},
	priority: {type: Number, required: false},
	seq_no: {type: Number, required: false},
}, {collection: 'truck_category_package_items'});