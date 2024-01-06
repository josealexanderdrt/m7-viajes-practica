import pool from "../../db/connection.js";

const getTravels = async () => {
  const SQLquery = { text: "SELECT * FROM viajes ORDER BY id DESC" };
  try {
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const insertTravel = async ({ destino, presupuesto }) => {
  const SQLquery = {
    text: "INSERT INTO viajes (destino, presupuesto) VALUES ($1, $2) RETURNING *",
    values: [destino, presupuesto],
  };

  try {
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const searchTravelById = async ({ id }) => {
  const SQLquery = {
    text: "SELECT * FROM viajes WHERE id = $1",
  };
  try {
    const idTravel = await pool.query(SQLquery, [id]);
    if (idTravel.rowCount === 0) {
      throw new Error("Travel not found");
    }
    return idTravel.rows;
  } catch (error) {
    throw new Error("Error getting Travel by ID" + error.message);
  }
};

const alterPresupuestoTravelById = async (presupuesto, id) => {
  const SQLquery = {
    text: "UPDATE viajes SET presupuesto = $1 WHERE id = $2",
    values: [presupuesto, id],
  };

  try {
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const alterDestinoTravelById = async (destino, id) => {
  const SQLquery = {
    text: "UPDATE viajes SET destino = $1 WHERE id = $2",
    values: [destino, id],
  };

  try {
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

export {
  getTravels,
  insertTravel,
  searchTravelById,
  alterPresupuestoTravelById,
  alterDestinoTravelById,
};
