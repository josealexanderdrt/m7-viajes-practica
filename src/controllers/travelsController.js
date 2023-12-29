import { getTravels, insertTravel } from "../models/travelModel.js";

const getAllTravels = async (req, res) => {
  try {
    const travels = await getTravels();
    res.status(200).json({ travels: travels });
  } catch (error) {
    res.status(500).json({ error: "Solicitud no procesada" });
    console.log("Solicitud no procesada ");
  }
};

const addTravel = async (req, res) =>{
try {
  const { travel } = req.body;
  const addedTravel = await insertTravel(travel);
  res.status(201).json({travel: addedTravel})
} catch (error) {
  res.status(500).json({error: "no se proceso solicitud"});
  console.log("No se proceso la solicitud")
}
}


export  {getAllTravels, addTravel};
