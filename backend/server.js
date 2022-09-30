const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
app.use(cors());
// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API running'));
const PORT = process.env.PORT || 8000;
app.use('/contractor', require('./routes/contractor'));
app.use('/employer', require('./routes/employer'));
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
