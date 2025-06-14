import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://melanyriveralores:O3RMArmlfT105SDW@cluster0.tz1hgep.mongodb.net/smart-coolers?retryWrites=true&w=majority', {
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
  const tickets = await Ticket.find();
  res.json(tickets);
});

app.post('/tickets', async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.status(201).json(ticket);
});

app.put('/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
