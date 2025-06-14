import mongoose from 'mongoose';

const uri = 'mongodb+srv://melanyriveralores:O3RMArmlfT105SDW@cluster0.tz1hgep.mongodb.net/smart-coolers?retryWrites=true&w=majority';

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
