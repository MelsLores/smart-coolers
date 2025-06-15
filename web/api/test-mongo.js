import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('❌ Error de conexión a MongoDB:', err);
  process.exit(1);
});
db.once('open', () => {
  console.log('✅ ¡Conexión exitosa a MongoDB!');
  process.exit(0);
});
