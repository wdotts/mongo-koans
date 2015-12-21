// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){


  describe('number of elements specified by the argument', function() {

    it('matches only those documents where the "results" array has length of 5', function(done){

      var query = { results: { $size: 5 } } ;

      var callback = function(err, data){

        expect(data[0]).to.exist;

        data.forEach(function(doc){
          expect(doc.results).to.have.length(5);
        }); //data.forEach

        done();
      };
      var cursor = db.collection('survey').find(query);
      var result = cursor.toArray(callback);

    });
  });

};
