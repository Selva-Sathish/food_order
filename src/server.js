import dotenv from '@dotenvx/dotenvx';
import { connectDB } from './config/db.js';

dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log("server is running on the port:", PORT);
    })
}


start();