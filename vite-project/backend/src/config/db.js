const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const conectarDB = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
