// inventory.controller.js
const InventoryService = require('./inventory.service');

const addInventory = async (req, res) => {
    const { date, item, quantity, condition } = req.body;

    try {
        await InventoryService.addInventory(date, item, quantity, condition);
        res.status(200).json({ message: 'Inventory item added successfully' });
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).json({ message: 'Failed to add inventory item', error: error.message });
    }
};

module.exports = {
    addInventory,
};
