// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Querying by Data Type', function() {

    it('has a property "tags" that is an array ', function(done){

      var query = { tags: { $type : "array" } };

      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc.tags).to.be.an('array');

        });

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
