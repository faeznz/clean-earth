const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const cors = require("cors");
// const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3001;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "clean_earth",
};

const pool = mysql.createPool(dbConfig);

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// app.use(cookieParser());

// Register endpoint
app.post("/register", async (req, res) => {
  const { email, username, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (email, username, phone_number, password) VALUES (?, ?, ?, ?)",
      [email, username, phoneNumber, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "clean_earth",
      {
        expiresIn: "1h",
      }
    );

    // res.cookie('token', token, { httpOnly: true });

    res.json({ token });
    // res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get('/check-cookie', (req, res) => {
//   const token = req.cookies.token;

//   if (token) {
//     res.json({ token });
//   } else {
//     res.status(404).json({ error: 'Cookie not found' });
//   }
// });

app.get("/nasabah", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM nasabah");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/setor_sampah", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM setor_sampah");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, async () => {
  try {
    await pool.getConnection();
    console.log(`Connected to the database`);
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
});
