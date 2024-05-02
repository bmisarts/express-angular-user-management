const User = require('../models/user.model');
const { success, error } = require('../helpers/respsonse')

let users = [
    new User(1, 'Serges', 'active'),
    new User(2, 'Mathias', 'inactive'),
    new User(3, 'Amelia', 'active')
];

function index(req, res) {
  res.status(200).send(
    success('Liste des utilisateurs', users)
  );
}

function get(req, res) {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  res.json(user);
}

function store(req, res) {
  const newUser = req.body;
  const id = users.length + 1;
  newUser.id = id;
  users.push(newUser);
  res.status(201).json(newUser);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const updateUser = req.body;
  users = users.map(user => {
    if (user.id === id) {
      return { ...user, ...updateUser };
    }
    return user;
  });
  res.json(users.find(user => user.id === id));
}

function changeStatus(req, res) {
    const id = parseInt(req.params.id);
    const newStatus = req.body.status;
    const user = users.find(user => user.id === id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    user.status = newStatus;
    res.json(user);
}
  
function remove(req, res) {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).send();
}

module.exports = {
  index,
  get,
  store,
  update,
  remove,
  changeStatus
};
