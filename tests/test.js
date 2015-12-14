var expect = require('chai').expect;
var mongo = require('../mongo/index');
var MongoClient = require('mongodb').MongoClient;
var URL_DATABASE = 'mongodb://localhost:27017/mongo-koans';
var db;

//https://docs.mongodb.org/v3.2/reference/operator/query/
describe('Query and Projection Operators', function() {

  var dbQP; // QueryAndProjection Collection

  before('establish database connection', function(done){
    MongoClient.connect(URL_DATABASE, function(err, database){
      if (err) throw err;
        db = database;
        dbQP = db.collection('QueryAndProjection');
        done();
    });
  });//establish database connection



  describe('Comparison', function(){

    before('remove all sample data', function(done){
      dbQP.remove({}, function(){ done() });
    });//remove all sample data

    before('set up sample collection', function(done) {
      var bulk = [];
      for ( var i = 0; i < 100; i++){
        var user = {
          "firstName" : "Master" + i,
          "secondName" : "Mind" + i
        }
        bulk.push(user);
      }
      dbQP.insert(bulk, function(){ done(); });
    });//set up sample collection

    it('can save a user without error', function(done){

      done();
    });


  });//Comparison

});


/*
before('remove all sample data', function(done){
  dbQP.remove({}, function(){ done() });
});
*/
