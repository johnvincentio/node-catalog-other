const truck_categoriesSchema = mongoose.Schema({
	_id: {type: Number, required: true},
	display_text: {type: String, required: true},
	seo_name: {type: String, required: false},
	image_url: {type: String, required: false},
	image_alt_text: {type: String, required: false},
	seq_no: {type: Number, required: false},
}, {collection: 'truck_categories'});