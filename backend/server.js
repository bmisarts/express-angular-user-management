const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/app');

 // Importation des routes depuis le dossier routes
const appRoutes = require('./routes/app.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware pour le parsing des requêtes JSON
app.use(bodyParser.json());

// Importer les routes
app.use('/user', userRoutes);
app.use('/', appRoutes);

// Démarrer le serveur
app.listen(config.PORT, () => {
  console.log(`Serveur démarré sur le port ${config.PORT}`);
});
