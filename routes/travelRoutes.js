 import express  from 'express';
 import {getAllTravels, addTravel} from '../src/controllers/travelsController.js';

 const router = express.Router();

 router.get('/travels', getAllTravels);
 router.post('/travels', addTravel);

 export default router