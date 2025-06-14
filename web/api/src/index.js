import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

// Cargar variables de entorno
dotenv.config();

const app = express();

// CORS seguro: solo permitir frontend local (ajusta para producción)
app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('Falta la variable de entorno MONGODB_URI');
  process.exit(1);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Ticket schema
const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// API routes
app.get('/tickets', async (req, res) => {
  const tickets = await Ticket.find().select('-__v'); // No exponer __v
  res.json(tickets);
});

app.post('/tickets',
  // Validación y sanitización
  body('title').isString().trim().notEmpty().escape(),
  body('description').isString().trim().notEmpty().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  }
);

app.put('/tickets/:id',
  body('title').optional().isString().trim().notEmpty().escape(),
  body('description').optional().isString().trim().notEmpty().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ticket);
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log('API server running on http://localhost:' + (process.env.PORT || 3000));
});
