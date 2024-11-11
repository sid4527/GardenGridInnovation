const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock user data for demonstration
const users = [
  { userId: 'user123', password: 'password123' },
];

app.post('/login', (req, res) => {
  const { userId, password } = req.body;
  const user = users.find(
    (u) => u.userId === userId && u.password === password
  );
  if (user) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
