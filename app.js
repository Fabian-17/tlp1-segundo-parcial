// Imports
const cors = require('cors');
const express = require('express');

const path = require('path');

require('dotenv').config();


const { sequelize } = require('./db');

sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));


const app = express();


const port = process.env.PORT || 4000;


// Middlewares
// TODO: Implementar middlewares

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

// Starting the server
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));