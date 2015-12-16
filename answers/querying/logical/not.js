// https://docs.mongodb.org/v3.0/reference/operator/query/ne/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Logical NOT', function() {

    it('Price NOT greater than 1.99', function(done){
      var query = { price: { $not: { $gt: 1.99 } }};
      var callback = function(err, data){

        data.forEach(function(doc){

          expect(doc.price).to.satisfy(function(price){ return (!price) || (!(price > 1.99)) } );
        });

        done();

      };
      var cursor = db.collection('or').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
