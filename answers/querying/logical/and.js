// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){


  describe('AND Queries With Multiple Expressions Specifying the Same Field', function() {

    it('Price is not equal 1.99 and the key "price" exists', function(done){
      var query = { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } ;
      var callback = function(err, data){

        expect(data[0]).to.exist;

        data.forEach(function(doc){

          expect(doc.price).to.exist;
          expect(doc.price).not.to.equal(1.99);

        });

        done();

      };
      var cursor = db.collection('or').find(query);
      var result = cursor.toArray(callback);

    });
  });
  describe('AND Queries With Multiple Expressions Specifying the Same Operator', function() {
    it('the price field value equals 0.99 or 1.99, and the sale field value is equal to true or the qty field value is less than 20' , function(done){
      var query = {
        $and : [
            { $or : [ { price : 0.99 }, { price : 1.99 } ] },
            { $or : [ { sale : true }, { qty : { $lt : 20 } } ] }
        ]
      };
      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){
          expect(doc).to.satisfy(function(obj) { return (((obj.price === 0.99)||(obj.price === 1.99)) && ((obj.sale === true)||(obj.qty < 20))) });
        });

        done();

      };
      var cursor = db.collection('or').find(query);
      var result = cursor.toArray(callback);

    });

  });
}
