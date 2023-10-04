import mongoose from 'mongoose';
import 'dotenv/config';

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado 🚀');
}).catch((err) => {
  console.error('Erro de coneccion', err.message);
});
