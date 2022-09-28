const express = require('express');
const connectDB = require('./config/db');
const app = express();
// Connect Database
connectDB();
app.get('/', (req, res) => res.send('API running'));
const PORT = process.env.PORT || 8000;
app.use('/contractor', require('./routes/contractor'));
app.use('/employer', require('./routes/employer'));
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
