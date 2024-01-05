 import express  from 'express';
 import {getAllTravels, addTravel, getTravelById, changePresupuestoTravelById} from '../src/controllers/travelsController.js';

 const router = express.Router();

 router.get('/travels', getAllTravels); 
 router.get('/travels/:id', getTravelById); 
 router.post('/travels', addTravel);
 router.put('/travels/:id',changePresupuestoTravelById);

 export default router