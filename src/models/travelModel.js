import pool from "../../db/connection.js";

const getTravels = async () => {
  const SQLquery = { text: "SELECT * FROM viajes ORDER BY id DESC" };
  /*   try { */
  const response = await pool.query(SQLquery);
  return response.rows;
  /*  } catch (error) {
    console.log(error);
  } */
};

const insertTravel = async ({ destino, presupuesto }) => {
  const SQLquery = {
    text: "INSERT INTO viajes (destino, presupuesto) VALUES ($1, $2) RETURNING *",
    values: [destino, presupuesto],
  };

  const response = await pool.query(SQLquery);
  return response.rows;
};

const searchTravelById = async ({ id }) => {
  const SQLquery = {
    text: "SELECT * FROM viajes WHERE id = $1",
  };
  const { rowCount, rows } = await pool.query(SQLquery, [id]);
  if (rowCount === 0) {
    throw {
      code: 404,
      message: `No se encontro ${id} Travel  en la base de datos, no existe`,
    };
  }
  return rows;
};

const alterPresupuestoTravelById = async (presupuesto, id) => {
  const SQLquery = {
    text: "UPDATE viajes SET presupuesto = $1 WHERE id = $2",
    values: [presupuesto, id],
  };

  const { rowCount, rows } = await pool.query(SQLquery);
  if (rowCount === 0) {
    throw {
      code: 404,
      message: `No se encontro ${id} Travel  en la base de datos, no existe`,
    };
  }
  return rows;
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

const updateTravel = async (id,  {destino, presupuesto} ) => {
  const SQLquery = {
    text: "UPDATE viajes SET destino =$2, presupuesto=$3 WHERE id = $1 RETURNING *",
    values: [id, destino, presupuesto],
  };
  const response = await pool.query(SQLquery);
  return response.rows;
};

const erraseDestinoTravelById = async (id) => {
  const SQLquery = {
    text: "DELETE FROM viajes WHERE id = $1 RETURNING*",
    values: [id],
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
  erraseDestinoTravelById,
  updateTravel,
};
