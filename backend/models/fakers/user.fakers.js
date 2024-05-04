const User = require('../../models/user.model')

// Les fausses donnees
fakers = [
    new User('Serges', 'serges@yaba-test.com', true),
    new User('Mathias', 'mathias@yaba-test.com', false),
    new User('Amelia', 'amelia@yaba-test.com', true)
];

module.exports = fakers;