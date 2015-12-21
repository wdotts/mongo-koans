// https://docs.mongodb.org/v3.0/reference/operator/query/ne/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Is not equal (i.e. !=) to the specified value. ', function() {

    it('qty not equal 20', function(done){
      var query = { qty: { $ne: 20 } };
      var callback = function(err, data){

        data.forEach(function(doc){
          expect(doc.qty).to.not.equal(20);
        });

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
