// Structurer et uniformiser les reponses de retour

function error(message = 'Une erreur s\'est produite lors de l\'exécution de la requête.', data = null) {
    return { 
        message : message,
        data : data
    }
}
    
function success(message = 'La requête a été exécutée avec succès.', data = null) {
    return { 
        message : message,
        data : data
    }
}    
  
module.exports = { error, success };
  