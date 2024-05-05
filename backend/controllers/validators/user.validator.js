const validator = require('validator');

// Fonction pour valider les données de création d'un utilisateur
function validateCreate(data, existingEmails) {
    const errors = {};

    // Vérifier que le nom est requis
    if (!data.name) {
        errors.name = ['Le nom est requis.'];
    } else if (!validator.isLength(data.name, { min: 4, max: 50 })) {
        errors.name = ['Le nom doit comporter entre 4 et 50 caractères.'];
    }

    // Vérifier que l'e-mail est requis et valide
    if (!data.email) {
        errors.email = ['L\'adresse e-mail est requise.'];
    } else if (!validator.isEmail(data.email)) {
        errors.email = ['L\'adresse e-mail est invalide.'];
    } else if (existingEmails && existingEmails.includes(data.email)) {
        errors.email = ['Cette adresse e-mail est déjà utilisée.'];
    }
    
    // Vérifier que le statut est un booléen
    if (('active' in data)) {
       if (!(typeof data.active === 'boolean')) 
            errors.active = ['Le statut doit être un booléen.'];
    }

    return errors;
}

// Fonction pour valider les données de modification d'un utilisateur
function validateUpdate(data, existingEmails) {
    const errors = {};
    
    // Vérifier que le nom est correct
    if (data.name) {
        // Vérifier que le nom est correct
        if (!validator.isLength(data.name, { min: 4, max: 50 })) {
            errors.name = ['Le nom doit comporter entre 4 et 50 caractères.'];
        }
    }

    // Vérifier que l'e-mail est correct
    if (data.email) {
        // Vérifier que l'e-mail est correct
        if (!validator.isEmail(data.email)) {
            errors.email = ['L\'adresse e-mail est invalide.'];
        }
        
        // Vérifier l'unicité de l'e-mail
        if (existingEmails && existingEmails.includes(data.email)) {
            errors.email = ['Cette adresse e-mail est déjà utilisée.'];
        }
        
        // Vérifier que le statut est un booléen
        if (('active' in data)) {
           if (!(typeof data.active === 'boolean')) 
                errors.active = ['Le statut doit être un booléen.'];
        }
    }

    return errors;
}

// Fonction pour valider les données de modification du statut d'un utilisateur
function validateStatus(data) {
    const errors = {};

    // Vérifier que le statut est un booléen
    if (!('active' in data)) {
        errors.active = ['Le statut est requis.'];
    } else if (!(typeof data.active === 'boolean')) {
        errors.active = ['Le statut doit être un booléen.'];
    }

    return errors;
}

module.exports = { validateCreate, validateUpdate, validateStatus };
