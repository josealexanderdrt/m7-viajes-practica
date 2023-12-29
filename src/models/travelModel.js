import pool from "../../db/connection.js";

const getTravels = async () =>{
    const SQLquery = {text: "SELECT * FROM viajes"};
    try {
        const response = await pool.query(SQLquery);
        return response.rows;

    } catch (error) {
        console.log(error)
    }
}

export default getTravels();