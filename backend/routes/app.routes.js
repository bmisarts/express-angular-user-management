const express = require('express');
const router = express.Router();
const appController = require("../controllers/app.controller.js")

// Routes de base
router.get('/', appController.index);
router.use(appController.notFound);

module.exports = router;