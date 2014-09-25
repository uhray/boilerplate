
var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    models = module.exports = exports = {};

models.users = mongoose.model('users', new mongoose.Schema({
  username:  { type: String, required: true, index: true },
}));
