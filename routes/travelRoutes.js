 import express  from 'express';
 import {getAllTravels} from '../src/controllers/travelsController.js';

 const router = express.Router();

 router.get('/travels', getAllTravels);

 export default router