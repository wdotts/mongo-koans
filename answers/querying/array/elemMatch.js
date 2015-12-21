// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Element Match', function() {

    it('matches only those documents where the "results" array contains at least one element that is both greater than or equal to 80 and is less than 85', function(done){
      var query = { results: { $elemMatch: { $gte: 80, $lt: 85 } } } ;
      var callback = function(err, data){
        expect(data[0]).to.exist;
        data.forEach(function(doc){
          expect(doc.results).to.satisfy(function(results){
            var match = false;
            results.forEach(function(val){
              if ( (val >= 80) && (val < 85) ) {
                match = true;
              }
            });
            return match;
          }); //expect
        }); //data.forEach

        done();

      };
      var cursor = db.collection('elemMatch').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Array of Embedded Documents', function() {
    it('matches only those documents where the "results" array contains at least one element with both "product" equal to "xyz" and "score" greater than or equal to 8' , function(done){

      var query = { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } };

      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc.results).to.satisfy(function(results){
            var match = false;
            results.forEach(function(val){
              if ( (val.product === "xyz") && (val.score >= 8) ) {
                match = true;
              };
            });
            return match;
          }); //expect

        }); //data.forEach
        done();

      };
      var cursor = db.collection('survey').find(query);
      var result = cursor.toArray(callback);

    });

  });
}
