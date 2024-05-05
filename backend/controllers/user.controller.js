const User = require('../models/user.model');
const { success, error } = require('../helpers/respsonse')
const { validateCreate, validateUpdate, validateStatus } = require('./validators/user.validator')
const db = require('../config/db');


function index(req, res) {
  users = db.users;
  res.status(200).send(
    success('Liste des utilisateurs.', users)
  );
}

function get(req, res) {
  const id = parseInt(req.params.id);
  const user = db.users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send(error('Utilisateur non trouvé', null));
  }
  res.send(success('Information utilisateur.',user));
}

function store(req, res) {
  const data = req.body;
  
  // Fonction pour récupérer la liste des e-mails existants
  const existingEmails = db.users.map(user => user.email);
  
  // Valider les données de l'utilisateur
  const validationErrors = validateCreate(data, existingEmails);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).send(error('Données invalides.', validationErrors));
  }
  
  newUser = new User(data.name, data.email);
  
  if(('active' in data)) {
    newUser.active = data.active;
  }
  
  db.users.push(newUser);
  
  res.status(201).send(success('Utilisateur crée avec succes.', newUser));
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body;
  
  const user = db.users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send(error('Utilisateur non trouvé'));
  }
  
  // Fonction pour récupérer la liste des e-mails existants
  const existingEmails = db.users.map(user => user.email).filter(email => email != user?.email);
  
  // Valider les données de l'utilisateur
  const validationErrors = validateUpdate(data, existingEmails);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).send(error('Données invalides.', validationErrors));
  }
  
  //Find index of specific object using findIndex method.    
  userIndex = db.users.findIndex(user=> user.id == id);
  //Update object's name property.
  db.users[userIndex].name = data.name ? data.name : db.users[userIndex].name;
  db.users[userIndex].email = data.email ? data.email : db.users[userIndex].email;
  db.users[userIndex].active = ('active' in data) ? data.active : db.users[userIndex].active;
  db.users[userIndex].updateAt = new Date();
  
  res.status(201).send(success('Utilisateur modifié avec succes.', db.users[userIndex]));
}

function changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const data = req.body;
    
    // Valider les données de l'utilisateur
    const validationErrors = validateStatus(data);
    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).send(error('Données invalides.', validationErrors));
    }
    
    const user = db.users.find(user => user.id === id);
    if (!user) {
      return res.status(404).send(error('Utilisateur non trouvé.'));
    }
    userIndex = db.users.findIndex(user=> user.id == id);
    db.users[userIndex].active = data.active;
    
    res.status(200).send(success('Statut modifié avec succes.', user));
}
  
function remove(req, res) {
  const id = parseInt(req.params.id);
  const user = db.users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send(error('Utilisateur non trouvé'));
  }
  userIndex = db.users.findIndex(user=> user.id == id);
  db.users.splice(userIndex ,1);
  
  res.status(200).send(success('Utilisateur supprimé avec succes'));
}

module.exports = {
  index,
  get,
  store,
  update,
  remove,
  changeStatus
};
