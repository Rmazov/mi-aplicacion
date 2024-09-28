// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// URL de conexión a MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos y definir la API
app.get('/api/data', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ricardo'); // Nombre de tu base de datos
        const collection = database.collection('mi_post'); // Nombre de tu colección

        const docs = await collection.find().toArray(); // Obtener todos los documentos
        res.json(docs); // Enviar los documentos como respuesta
    } catch (error) {
        res.status(500).send(error.message); // Manejo de errores
    } finally {
        // No cierres el cliente aquí para mantener la conexión abierta
        // await client.close(); 
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
