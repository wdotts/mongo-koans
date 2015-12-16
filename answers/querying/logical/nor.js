// https://docs.mongodb.org/v3.0/reference/operator/query/ne/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Logical NOR', function() {

    it('Neither price equals 1.99 NOR sale is true', function(done){
      var query = { $nor: [ { price: 1.99 }, { sale: true } ]  };
      var callback = function(err, data){

        data.forEach(function(doc){

          expect(doc.price).to.not.equal(1.99);
          expect(doc.sale).to.not.be.true;
        });

        done();

      };
      var cursor = db.collection('or').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
