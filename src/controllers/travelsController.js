import {
  getTravels,
  insertTravel,
  searchTravelById,
  alterPresupuestoTravelById,
  alterDestinoTravelById,
  eraseDestinoTravelById,
  updateTravel,
} from "../models/travelModel.js";

import { findError } from "../utils/utils.js";

const reportarConsulta = async (req, res, next) => {
  const parametros = req.params;
  const url = req.url;
  console.log(
    `
  Hoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url}
  con los parámetros:
  `,
    parametros
  );
  next();
};

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
    const addedTravel = await insertTravel(travel);
    res.status(201).json({ travel: addedTravel });
  } catch (error) {
    const errorFound = findError(error.code);
    if (errorFound.length > 0) {
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getTravelById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await searchTravelById({ id });
    if (result === undefined) {
      return res.status(404).json({ message: "No se encontro ningun viaje" });
    } else {
      return res.status(200).json({ travel: result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { code, message } = error;
    res.status(code).json({ error: `${code}`, message: `${message}` });
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

const updateTravels = async (req, res) => {
  try {
    const { id } = req.params;
    const { travel } = req.body;
    const allowedProperties = ["destino", "presupuesto"];
    const unwantedProperties = Object.keys(travel).filter(
      (property) => !allowedProperties.includes(property)
    );
    if (unwantedProperties.length > 0) {
      throw new Error(
        `Propiedades no permitidas: ${unwantedProperties.join(" , ")}`
      );
    } else if (!travel.destino && !travel.presupuesto) {
      throw new Error(
        `Debes incluir al menos ${allowedProperties.join(
          " , "
        )} para actualizar el regristro`
      );
    }
    const travel_update = await updateTravel(
      id,
      travel.destino,
      travel.presupuesto
    );
    res.status(200).json({ travel: travel_update });
  } catch (error) {
    res.status(500).json({
      error: `Actulizar el registro no es posible:  ${error.message} `,
    });
    console.log(error);
  }
};

const deleteTravelByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ menssage: "error de parametos el ID debe ser un número" });
    }
    const resultDelete = await eraseDestinoTravelById(id);
    if (resultDelete === 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }
    res.status(200).json({
      message: "Registro eliminado con exito",
    });
  } catch (error) {
    console.error("No se proceso la solicitud ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  getAllTravels,
  addTravel,
  getTravelById,
  changePresupuestoTravelById,
  changeDestinoTravelById,
  deleteTravelByID,
  reportarConsulta,
  updateTravels,
};
