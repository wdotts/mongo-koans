// https://docs.mongodb.org/v3.0/reference/operator/query/lt/
var expect = require('chai').expect;

module.exports = function(db){


  describe('The field value is not in the specified array or', function() {

    it('qty not to be  5 or 15', function(done){
      var query = { qty: { $nin: [ 5, 15 ] } };
      var callback = function(err, data){

        data.forEach(function(doc){
          expect(doc.qty).not.to.satisfy(function(num) {  return ((num === 5) || (num === 15)) });
        });

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
