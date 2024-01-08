import express from "express";
import {
  getAllTravels,
  addTravel,
  getTravelById,
  changePresupuestoTravelById,
  changeDestinoTravelById,
  deleteTravelByID,
  reportarConsulta,
} from "../src/controllers/travelsController.js";

const router = express.Router();

router.get("/travels", reportarConsulta, getAllTravels);
router.get("/travels/:id", reportarConsulta, getTravelById);

router.post("/travels", reportarConsulta, addTravel);

router.put(
  "/travels/:id/presupuesto",
  reportarConsulta,
  changePresupuestoTravelById
);
router.put("/travels/:id/destino", reportarConsulta, changeDestinoTravelById);

router.delete("/travels/:id", reportarConsulta, deleteTravelByID);

export default router;
