var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var deasync = require('deasync');
var mongo = deasync(MongoClient.connect);
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

    db.collection('eq').remove({}, function(){
      done();
    });

  });//remove all sample eq data

  before('remove all sample in data', function(done){

    db.collection('in').remove({}, function(){
      done();
    });

  });//remove all sample data

  before('set up sample eq collection', function(done) {
    var bulk = require('../dataSamples/eq.js');
    db.collection('eq').insert(bulk, function(){ done(); });
  });//set up sample eq collection

  before('set up sample in collection', function(done) {
    var bulk = require('../dataSamples/in.js');
    db.collection('in').insert(bulk, function(){ done(); });
  });//set up sample collection


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
});
