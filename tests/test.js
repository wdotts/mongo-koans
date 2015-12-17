var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var deasync = require('deasync');
var mongo = deasync(MongoClient.connect); //use mongo synchrously
var URL_DATABASE = 'mongodb://localhost:27017/mongo-koans';

try{
  db = mongo(URL_DATABASE);
}
catch(err){
  console.log(err);
}

//https://docs.mongodb.org/v3.2/reference/operator/query/
describe('Query Operator', function() {

  before('remove all sample eq data', function(done){

    async.parallel([
      function(callback){ db.collection('eq').remove({}, callback()); },
      function(callback){ db.collection('in').remove({}, callback()); },
      function(callback){ db.collection('or').remove({}, callback()); },
      function(callback){ db.collection('records').remove({}, callback()); }
    ], function(){ done() });



  });//remove all sample data

  before('set up sample eq collection', function(done) {
    var _eq = require('../dataSamples/eq.js');
    var _in = require('../dataSamples/in.js');
    var _or = require('../dataSamples/or.js');
    var _records = require('../dataSamples/records.js');

    async.parallel([
      function(callback){ db.collection('eq').insert(_eq, callback()); },
      function(callback){ db.collection('in').insert(_in, callback()); },
      function(callback){ db.collection('or').insert(_or, callback()); },
      function(callback){ db.collection('records').insert(_records, callback()); }
    ], function(){ done() });


  });//set up sample eq collection




  //$eq operator
  describe('$eq', function(){

    var test = require('../answers/querying/eq.js');
    test(db);

  });//$eq

  //$gt operator
  describe('$gt', function(){

    var test = require('../answers/querying/gt.js');
    test(db);

  });//$gt

  //$gte operator
  describe('$gte', function(){

    var test = require('../answers/querying/gte.js');
    test(db);

  });//$gte

  //$lt operator
  describe('$lt', function(){

    var test = require('../answers/querying/lt.js');
    test(db);

  });//$lt

  describe('$lte', function(){

    var test = require('../answers/querying/lte.js');
    test(db);

  });//$lte

  describe('$ne', function(){

    var test = require('../answers/querying/ne.js');
    test(db);

  });//$ne

  describe('$in', function(){

    var test = require('../answers/querying/in.js');
    test(db);

  });//$in

  describe('$nin', function(){

    var test = require('../answers/querying/nin.js');
    test(db);

  });//$nin

  describe('$or', function(){

    var test = require('../answers/querying/logical/or.js');
    test(db);

  });//$or

  describe('$and', function(){

    var test = require('../answers/querying/logical/and.js');
    test(db);

  });//$and

  describe('$not', function(){

    var test = require('../answers/querying/logical/not.js');
    test(db);

  });//$not

  describe('$nor', function(){

    var test = require('../answers/querying/logical/nor.js');
    test(db);

  });//$not
});
