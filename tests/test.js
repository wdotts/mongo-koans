var expect = require('chai').expect;
var mongo = require('../mongo/index');
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

  //$eq operator
  describe('$eq', function(){

    before('remove all sample data', function(done){

      db.collection('eq').remove({}, function(){ done() });
      
    });//remove all sample data

    before('set up sample collection', function(done) {
      var bulk = require('../dataSamples/eq.js');
      db.collection('eq').insert(bulk, function(){ done(); });
    });//set up sample collection

    var test = require('../answers/querying/eq.js');
    test(db);

  });//$eq



});
