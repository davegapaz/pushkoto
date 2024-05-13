import express from 'express';
import cors from 'cors';

// Initialize server
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Plugin for reading JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import router
import router from './router.js';
router(app);


// Server listens at Port 3001
app.listen(3001, () => { console.log("API listening at port 3001.")});