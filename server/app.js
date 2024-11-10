const express = require("express");
const mysql = require('mysql2'); // 使用 mysql2 代替 mysql
const cors = require("cors");


const app = express();



app.listen(3004, () => {
  console.log("app server ready on: http://localhost:3004");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"123456",
  dabase:"garden24"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected.");
  }
});

// 创建 userProfile 表格的 API
app.post("/api/user/createTable", (req, res) => {
  const sql = `CREATE TABLE IF NOT EXISTS userProfile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL, 
    Email NVARCHAR(100) NOT NULL,  
    Preferences NVARCHAR(255), 
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
    UpdatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
  )`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Error creating table" });
    res.json({ message: "Table created successfully" });
  });
});




app.get("/",(req,res)=>{
  const sql="SELECT * FROM Users";
  db.query(sql,(err,data)=>{
    if(err) return res.json({Message:"Error inside server"});
    return res.json(data);
  })
})




app.use(express.urlencoded({ extends: false }));
//for user router
const userRouter = require("./router/user");
app.use("/api", userRouter);
