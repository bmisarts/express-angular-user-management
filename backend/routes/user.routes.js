const express = require('express');
const router = express.Router();
const users = require("../controllers/user.controller.js")

// Routes utilisateur
router.get('/', users.index);
router.get('/:id', users.get);
router.post('/', users.store);
router.put('/:id', users.update);
router.put('/change-status', users.changeStatus);
router.delete('/:id', users.remove);

module.exports = router;