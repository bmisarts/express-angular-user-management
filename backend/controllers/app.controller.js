const { success, error } = require('../helpers/respsonse');

// Point d'entrée de l'application
function index(req, res) {
    res.status(200).send(
        success(
            "Bienvenue sur Yaba-In", 
            "Sujet de test technique traité par Gilles Kemgoum"
        )
    );
}

// Exception 404
function notFound(req, res, next) {
    res.status(404).json(error(
        'Ressource non trouvée', 
        'Le chemin que vous essayez d\'atteindre est introuvable'
    ));
}

module.exports = { index, notFound };
