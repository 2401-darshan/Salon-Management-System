const express = require('express');
const ConnectDB = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const customerRoutes = require('./src/routes/customerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running @ ${process.env.PORT}`);
});