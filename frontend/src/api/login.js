// src/api/login.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { userId, password } = req.body;
  
      // Example user data for authentications..,,
      const users = [{ userId: 'user123', password: 'password123' }];
  
      const user = users.find(
        (u) => u.userId === userId && u.password === password
      );
  
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  