import {getTravels} from '../models/travelModel.js'

const getAllTravels = async (req, res) => {
    try {
        const travels = await getTravels();
        res.status(200).json({ travels : travels});

    } catch (error) {
        res.status(500).json({error: "Solicitud no procesada"});
        console.log("Solicitud no procesada ")
    }
}
export default getAllTravels