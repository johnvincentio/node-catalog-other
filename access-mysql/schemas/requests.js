const requestsSchema = mongoose.Schema({
	_id: {type: Number, required: true},
	customer_company: {type: String, required: true},
	customer_name: {type: String, required: true},
	customer_address: {type: String, required: true},
	customer_phone: {type: String, required: true},
	customer_alt_phone: {type: String, required: true},
	customer_email: {type: String, required: true},
	requested_delivery_date: {type: undefined, required: true},
	special_instructions: {type: String, required: false},
	request_date: {type: undefined, required: true},
}, {collection: 'requests'});