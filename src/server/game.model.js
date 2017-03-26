var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    title : String,
    platform : String,
    score : Number,
    genre : String,
    editors_choice : Boolean
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;