const sql = require("msnodesqlv8");

const connectionString = "server=localhost\SQLEXPRESS;Database=master;TrustedConnection=Yes;";
const query = "SELECT * FROM MSreplication_options"

sql.query(connectionString, query, (err,rows) => {
    console.log(rows);
});