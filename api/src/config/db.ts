import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);

    // Ne pas arrêter le processus dans un environnement de test
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1); // Arrêter seulement en production ou développement
    }
  }
};

export default connectDB;
