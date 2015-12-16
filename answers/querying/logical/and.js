// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){


  describe('performs a logical OR operation', function() {

    it('Is has quantity less than 20 or price equal 10', function(done){
      var query = { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] };
      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc).to.satisfy(function(obj) { return ((obj.quantity < 20) || (obj.price === 10)) });

        });

        done();

      };
      var cursor = db.collection('or').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
