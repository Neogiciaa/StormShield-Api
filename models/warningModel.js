import connexion from "../DataBaseConfig.js";

/*export const createLocation = async (req, res) => {
    const { cityName, latitude, longitude } = req.body;

    try {
        const newLocation = await connexion.query(
            `INSERT INTO Location (cityName, latitude, longitude) VALUES (?, ?, ?)`,
            [cityName, latitude, longitude]
        );

        res.status(200).json({ data: cityName, latitude, longitude });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la Location", error: error.message });
    }
};

export const createAlert = async (req, res) => {
    const { name, intensity, locationId } = req.body;

    try {
        const newAlert = await connexion.query(
            `INSERT INTO Alert (name, intensity, locationId) VALUES (?, ?, ?)`,
            [name, intensity, locationId]
        );

        res.status(200).json({data: name, intensity, locationId });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'alerte", error: error.message });
    }
};*/


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
