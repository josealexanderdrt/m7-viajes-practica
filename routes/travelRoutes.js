 import express  from 'express';
 import {getAllTravels, addTravel, getTravelById} from '../src/controllers/travelsController.js';

 const router = express.Router();

 router.get('/travels', getAllTravels); 
 router.get('/travels/:id', getTravelById); 
 router.post('/travels', addTravel);

 export default router