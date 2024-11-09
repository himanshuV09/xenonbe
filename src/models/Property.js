import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
		unique: true,
	},
	location: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

export const Property = mongoose.model('Property', PropertySchema);
