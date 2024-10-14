import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // const uri = `mongodb://localhost:${process.env.DATABASE_PORT}/${process.env.MONGO_INITDB_DATABASE}`;
    const uri = process.env.MONGO_URI as string;
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};

export default connectDB;
