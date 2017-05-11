const locations1Schema = mongoose.Schema({
	_id: {type: Number, required: true},
	branch: {type: Number, required: true},
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zip: {type: String, required: true},
	phone: {type: String, required: true},
	fax: {type: String, required: false},
	seq_no: {type: Number, required: false},
}, {collection: 'locations1'});