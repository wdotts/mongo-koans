//https://docs.mongodb.org/v3.0/reference/operator/query/gte/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Greater than or equal to (i.e. >=) a specified value ', function() {

    it('qty greater or equal 20', function(done){
      var query = { qty: { $gte: 20 } };
      var callback = function(err, data){

        expect(data).to.have.length(4);
        expect(data[3].qty).to.be.at.least(20);

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
