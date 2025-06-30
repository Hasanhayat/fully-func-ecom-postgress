import express from "express";
import db from "./db.mjs";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.SECRET_TOKEN;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the E-commerce API" });
});

app.post("/sign-up", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  email = email.toLowerCase();
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // new user
    await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
        user_role: user.rows[0].role || "4", // Default role if not set
        iat: Date.now() / 1000,
        exp: Date.now() / 1000 + 1000 * 60 * 60 * 24,
      },
      JWT_SECRET
    );
    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000, //1 day
    });

    res.json({ message: "Login successful", user: user.rows[0] });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to check JWT token
app.use("/*splat", (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
});

app.get("/profile", (req, res) => {
  const user = req.user;
  try {
    let result = db.query("SELECT * FROM users WHERE id = $1", [user.id]);
    res.send({ message: "User profile", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("Token", {
    httpOnly: true,
    secure: true,
    maxAge: 0, // Clear the cookie
  });
  res.json({ message: "Logout successful" });
});

app.get("/products", async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//middeware to check if user is admin
app.use("/*splat", (req, res, next) => {
  const user = req.user;
  if (user.user_role !== "1") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
  next();
});

app.post("/products", async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = await db.query(
      "INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, image]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to serve static files
let __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use("/", express.static(path.join(__dirname, "./frontend/dist")));
app.use("/*splat", express.static(path.join(__dirname, "frontend", "dist")));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
