import {
  getTravels,
  insertTravel,
  searchTravelById,
  alterPresupuestoTravelById,
  alterDestinoTravelById,
  erraseDestinoTravelById,
} from "../models/travelModel.js";

const getAllTravels = async (req, res) => {
  try {
    const travels = await getTravels();
    res.status(200).json({ travels: travels });
  } catch (error) {
    res.status(500).json({ error: "Solicitud no procesada" });
    console.log("Solicitud no procesada ");
  }
};

const addTravel = async (req, res) => {
  try {
    const { travel } = req.body;
    if (
      !travel.destino ||
      typeof travel.destino !== "string" ||
      !travel.presupuesto ||
      typeof travel.presupuesto !== "number" ||
      travel.presupuesto <= 0
    ) {
      throw new Error("Faltan datos por ingresar");
    }
    const addedTravel = await insertTravel(travel);
    res.status(201).json({ travel: addedTravel });
  } catch (error) {
    res.status(500).json({ error: "no se proceso solicitud" + error.message });
    console.log("No se proceso la solicitud", error);
  }
};

const getTravelById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await searchTravelById({ id });
    res.status(200).json({ travel: result });
  } catch (error) {
    res.status(500).json({ error: "No se proceso solicitud" });
    console.log("No se proceso la solicitud");
  }
};

const changePresupuestoTravelById = async (req, res) => {
  const { id } = req.params;
  const { presupuesto } = req.query;

  try {
    if (!id || isNaN(id) || !presupuesto || isNaN(presupuesto)) {
      throw new Error("Parámetros Invalidos");
    }
    await alterPresupuestoTravelById(presupuesto, id);
    const changeReresult = await searchTravelById({ id });
    res.status(200).json({
      "Nuevo Presupuesto": presupuesto,
      "Resultado del cambio es: ": changeReresult,
    });
  } catch (error) {
    res.status(500).json({ error: "no se proceso solicitud" + error.message });
    console.log("No se proceso la solicitud", error);
  }
};

const changeDestinoTravelById = async (req, res) => {
  const { id } = req.params;
  const { destino } = req.query;

  try {
    if (!id || isNaN(id) || !destino || !isNaN(destino)) {
      throw new Error("Parámetros Invalidos");
    }
    await alterDestinoTravelById(destino, id);
    const changeReresult = await searchTravelById({ id });
    res.status(200).json({
      "Nuevo Destino": destino,
      [`Resultado de ${req.method} en el Travel con id: ${id} fue`]:
        changeReresult,
    });
  } catch (error) {
    res.status(500).json({ error: "no se proceso solicitud" + error.message });
    console.log("No se proceso la solicitud", error);
  }
};

const deleteTravelByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      throw new Error("Error en parametros");
    }
    const resultDelete = await erraseDestinoTravelById(id);
    res.status(200).json({
      [`${req.method} aplicado a travel con id ${id} se elimino: `]:
        resultDelete,
    });
  } catch (error) {
    res.status(500).json({
      error: [`No se proceso solicitud ${req.method} `] + error.message,
    });
    console.log("No se proceso la solicitud", error);
  }
};



export {
  getAllTravels,
  addTravel,
  getTravelById,
  changePresupuestoTravelById,
  changeDestinoTravelById,
  deleteTravelByID,
};
