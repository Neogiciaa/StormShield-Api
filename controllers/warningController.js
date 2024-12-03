//import du modèle

export const createWarningAlert = async (req, res) => {
    const { description, locationId } = req.body;
    try {
        const newAlert = await WarningAlert.create({ description, locationId});
        res.status(200).json({ success: true, data: newAlert });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAlertsByLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
        const alerts = await WarningAlert.findAll({ where: { locationId } });
        res.status(200).json({ success: true, data: alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

