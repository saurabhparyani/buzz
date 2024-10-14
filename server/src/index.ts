import { InitServer } from "./app";
import connectDB from './config/connection';
import dotenv from 'dotenv';

dotenv.config();

async function init() {
  try {
    // First, connect to MongoDB
    await connectDB();

    // Initialize the server once DB is connected
    const app = await InitServer();
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Error initializing the server:', err);
    process.exit(1);
  }
}

init();
