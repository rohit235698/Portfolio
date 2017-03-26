var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var fs =  require('fs');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(morgan('dev'));





/*****for parsing csv*****/
//var csv = require('fast-csv');

/**********Not required for now Will use Later******************
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Game = require('./game.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//Inserting games from CSV to mongo
csv
        .fromPath('/root/Documents/Capillary-Test/src/server/games.csv')
        .on('data', function(data) {
            console.log(data);
            var Obj = new Game({
                                  title : data[0],
                                  platform : data[1],
                                  score : data[2],
                                  genre : data[3],
                                  editors_choice : data[4]
                                });
            Obj.save((err,obj)=>{
              if(err)
                console.error(err);
            });


});

  app.get('/games', function(req, res) {
    Game.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });
*/
  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });


module.exports = app;