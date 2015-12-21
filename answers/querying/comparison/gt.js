// https://docs.mongodb.org/v3.0/reference/operator/query/gt/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Greater than (i.e. >) the specified value', function() {

    it('qty greater than 20', function(done){
      var query = { qty: { $gt: 20 } };
      var callback = function(err, data){

        expect(data[0].qty).to.be.above(20);
        expect(data[1].qty).to.be.above(20);

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
