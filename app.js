const express = require('express');
const ConnectDB = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');

const customerRoutes = require('./src/routes/customerRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const barberRoutes = require('./src/routes/barberRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/appointments', appointmentRoutes);

ConnectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running @ ${process.env.PORT}`);
});