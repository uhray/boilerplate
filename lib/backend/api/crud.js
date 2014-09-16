var crud = module.exports = exports = require('node-crud')(),
    api = require('./controller');

crud.entity('/users')
    .create(api.users.create)
    .read(api.users);
