import express from 'express';
import { PropertyController } from './property.controller.js';
import { isAuth } from '../../middlewares/Auth.js';

const propertyrouter = express.Router();

propertyrouter.post(
	'/recommendations',
	isAuth('Admin'),
	PropertyController.recommnend
);
propertyrouter.post(
	'/addProperty',
	PropertyController.addMultipleProperties
);

propertyrouter.get('/getProperties',
	isAuth('Admin'),
	PropertyController.getProperties
)

export const PropertyRouter = propertyrouter;
