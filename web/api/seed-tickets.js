import mongoose from 'mongoose';

const uri = 'mongodb+srv://melanyriveralores:O3RMArmlfT105SDW@cluster0.tz1hgep.mongodb.net/smart-coolers?retryWrites=true&w=majority';

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

async function seed() {
  await mongoose.connect(uri);
  await Ticket.deleteMany({}); // Limpia la colección antes de insertar
  await Ticket.insertMany([
    {
      title: 'Cooler no enfría',
      description: 'El cooler del área 1 no está enfriando correctamente.',
      status: 'open'
    },
    {
      title: 'Ruido extraño',
      description: 'Se escucha un ruido extraño en el cooler del almacén.',
      status: 'open'
    },
    {
      title: 'Fuga de agua',
      description: 'Hay una fuga de agua en el cooler de la oficina.',
      status: 'closed'
    }
  ]);
  console.log('✅ Tickets de prueba insertados');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Error al insertar tickets:', err);
  process.exit(1);
});
