import connexion from "../DataBaseConfig.js";

export const createWarningAlert = async (req, res) => {
    const { description, lat, lon } = req.body;
    try {
        const newLocation = await connexion.query(`INSERT INTO Location VALUES (?, ?), [lat, lon])]`);
        const createdLocationId = result.insertId;

        const newAlert = await connexion.query(`INSERT INTO Alert VALUES (?, ?), [description, locationId]`);






        res.status(200).json({ data: newAlert });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateWarningAlert = async (req, res) => {
    const { description, locationId, alertId } = req.body;

}

export const getAlertsByLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
        const alerts = await WarningAlert.findAll({ where: { locationId } });
        res.status(200).json({ data: alerts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

