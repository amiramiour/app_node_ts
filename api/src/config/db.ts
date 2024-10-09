import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        
        // Connexion à MongoDB
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);

        // Ne pas arrêter le processus dans un environnement de test
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};

export default connectDB;
