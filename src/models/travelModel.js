import pool from "../../db/connection.js";

const getTravels = async () => {
  const SQLquery = { text: "SELECT * FROM viajes" };
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

export { getTravels, insertTravel, searchTravelById };
