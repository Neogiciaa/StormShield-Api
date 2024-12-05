import connexion from "../DataBaseConfig.js";


export const createWarningAlert = async (req, res) => {
    const { lat, lon } = req.query;
    const description = req.body.description;

    try {
        const newWarningAlert = await connexion.query(
            `INSERT INTO WarningAlert (description, locationId) VALUES (?, ?)`,
            [description, 1]
        );
        res.status(200).json({ data: description, lat, lon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllWarningAlert = async (req, res) => {
    try {
        const allWarningAlert = await connexion.query(
            `SELECT * FROM WarningAlert`
        );
        res.status(200).json({ data: allWarningAlert[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
