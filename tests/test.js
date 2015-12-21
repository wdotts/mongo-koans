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
      function(callback){ db.collection('records').remove({}, callback()); },
      function(callback){ db.collection('mod').remove({}, callback()); },
      function(callback){ db.collection('text').drop( callback() ); },
      function(callback){ db.collection('all').remove({}, callback()); },
      function(callback){ db.collection('elemMatch').remove({}, callback()); },
      function(callback){ db.collection('survey').remove({}, callback()); }
    ], function(){ done() });



  });//remove all sample data

  before('set up sample collections', function(done) {
    var _eq = require('../dataSamples/eq.js');
    var _in = require('../dataSamples/in.js');
    var _or = require('../dataSamples/or.js');
    var _records = require('../dataSamples/records.js');
    var _mod = require('../dataSamples/mod.js');
    var _regexp = require('../dataSamples/regexp.js');
    var _text = require('../dataSamples/text.js');
    var _all = require('../dataSamples/all.js');
    var _elemMatch = require('../dataSamples/elemMatch.js');
    var _survey = require('../dataSamples/survey.js');


    async.parallel([
      function(callback){ db.collection('eq').insert(_eq, callback()); },
      function(callback){ db.collection('in').insert(_in, callback()); },
      function(callback){ db.collection('or').insert(_or, callback()); },
      function(callback){ db.collection('records').insert(_records, callback()); },
      function(callback){ db.collection('mod').insert(_mod, callback()); },
      function(callback){ db.collection('regexp').insert(_regexp, callback()); },
      function(callback){ db.collection('text').insert(_text, function(){
        db.collection('text').createIndex({ "subject": "text" }, {}, function(){
          callback();
        } );
      })},
      function(callback){ db.collection('all').insert(_all, callback()); },
      function(callback){ db.collection('elemMatch').insert(_elemMatch, callback()); },
      function(callback){ db.collection('survey').insert(_survey, callback()); }
    ], function(){ done() });

  });//set up sample eq collection

  var tests = [
    { '$eq'     : '../answers/querying/comparison/eq.js' },
    { '$gt'     : '../answers/querying/comparison/gt.js' },
    { '$gte'    : '../answers/querying/comparison/gte.js' },
    { '$lt'     : '../answers/querying/comparison/lt.js' },
    { '$lte'    : '../answers/querying/comparison/lte.js' },
    { '$ne'     : '../answers/querying/comparison/ne.js' },
    { '$in'     : '../answers/querying/comparison/in.js' },
    { '$nin'    : '../answers/querying/comparison/nin.js' },
    { '$or'     : '../answers/querying/logical/or.js' },
    { '$and'    : '../answers/querying/logical/and.js' },
    { '$not'    : '../answers/querying/logical/not.js' },
    { '$nor'    : '../answers/querying/logical/nor.js' },
    { '$exists' : '../answers/querying/element/exists.js' },
    { '$type'   : '../answers/querying/element/type.js' },
    { '$mod'    : '../answers/querying/evaluation/mod.js' },
    { '$regexp' : '../answers/querying/evaluation/regexp.js' },
    { '$text'   : '../answers/querying/evaluation/text.js' },
    { '$all'    : '../answers/querying/array/all.js' },
    { '$elemMatch'    : '../answers/querying/array/elemMatch.js' },
    { '$size'    : '../answers/querying/array/size.js' }
  ];

  tests.forEach(function(element, index){
    var key = Object.keys(element);
    var desc = key[0];
    var path = element[desc];

    describe( desc , function(){

      var test = require( path );
      test(db);

    });//$eq
  } );



});
