//https://docs.mongodb.org/v3.0/reference/operator/query/in/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Use the $in Operator to Match Values', function() {

    it('is either 5 or 15', function(done){

      var query = { qty: { $in: [ 5, 15 ] } };

      var callback = function(err, data){

        data.forEach(function(doc){
          expect(doc.qty).to.satisfy(function(num) {  return ((num === 5) || (num === 15)) });
        });

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });



  describe('Use the $in Operator to Match Values in an Array', function() {


    it('"sale" to be true after update', function(done){

      var query = { tags: { $in: ["appliances", "school"] } };
      var update = { $set: { sale:true } };

      var callback = function(err, data){

        expect(data[0].sale).to.be.true;
        done();

      };
      db.collection('in').update(query, update);

      var cursor = db.collection('in').find(query);
      var result = cursor.toArray(callback);


    });


  });

  describe('Use the $in Operator with a Regular Expression', function() {


    it('to find either /^be/ or /^sch/ tags', function(done){
      var query = { tags: { $in: [ /^be/, /^sch/ ] } };
      var callback = function(err, data){

        data.forEach(function(doc){
          expect(doc.tags[0]).to.match(/^sch/);
        });

        done();

      };
      var cursor = db.collection('in').find(query);
      var result = cursor.toArray(callback);

    });


  });


}
