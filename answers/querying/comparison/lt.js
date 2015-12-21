// https://docs.mongodb.org/v3.0/reference/operator/query/lt/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Less than (i.e. <) the specified value', function() {

    it('qty greater than 20', function(done){
      var query = { qty: { $lt: 20 } };
      var callback = function(err, data){

        data.forEach(function(doc){
          expect(doc.qty).to.be.below(20);
        });

        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
