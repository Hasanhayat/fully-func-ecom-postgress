import express from 'express';
import db from './db.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});