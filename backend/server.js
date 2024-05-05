const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const config = require('./config/app');
const db = require('./config/db');
const fakeUsers = require('./models/fakers/user.fakers');

// Initialiser la base de donnees
db.users = [...fakeUsers];

 // Importation des routes depuis le dossier routes
const appRoutes = require('./routes/app.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Configuration websocket
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: "*"
  }
});

var corsOptions = {
  origin: "http://localhost:4200"
  // origin: "*"
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware pour le parsing des requêtes JSON
app.use(bodyParser.json());

// Importer les routes
app.use('/api/user', userRoutes);
app.use('/', appRoutes);

// Démarrer le serveur
app.listen(config.PORT, () => {
  console.log(`Serveur démarré sur le port ${config.PORT}`);
});