import express from "express";
import {
  getAllTravels,
  addTravel,
  getTravelById,
  changePresupuestoTravelById,
  changeDestinoTravelById,
} from "../src/controllers/travelsController.js";

const router = express.Router();

router.get("/travels", getAllTravels);
router.get("/travels/:id", getTravelById);
router.post("/travels", addTravel);
router.put("/travels/:id/presupuesto", changePresupuestoTravelById);
router.put("/travels/:id/destino", changeDestinoTravelById);

export default router;
