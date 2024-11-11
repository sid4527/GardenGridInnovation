// inventory.service.js
const sql = require('mssql');

const addInventory = async (date, item, quantity, condition) => {
    const request = new sql.Request();
    const query = `
        INSERT INTO Inventory (date, item, quantity, condition)
        VALUES (@date, @item, @quantity, @condition)
    `;

    request.input('date', sql.Date, date);
    request.input('item', sql.NVarChar, item);
    request.input('quantity', sql.Int, quantity);
    request.input('condition', sql.NVarChar, condition);

    await request.query(query);
};

module.exports = {
    addInventory,
};
