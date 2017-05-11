const request_detailsSchema = mongoose.Schema({
	_id: {type: Number, required: true},
	requests_id: {type: Number, required: true},
	data: {type: undefined, required: true},
}, {collection: 'request_details'});