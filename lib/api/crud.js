var crud = module.exports = exports = require('crud')(),
    api = require('./controller');

crud.entity('/users')
    .create(api.users.create)
    .retrieve(api.users);
