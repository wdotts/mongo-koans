// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){

  describe('Exists and Not Equal To', function() {

    it('Exists and is not equal to either 5 or 15.', function(done){
      var query = { qty: { $exists: true, $nin: [ 5, 15 ] } };

      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc.qty).to.exist;
          expect(doc.qty).not.to.equal(5);
          expect(doc.qty).not.to.equal(15);

        });

        done();

      };
      var cursor = db.collection('or').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Exists True', function() {

    it('Contains the field a, including the document whose field a contains a null value', function(done){

      var query = { a: { $exists: true } };

      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc.a).to.exist;


        });

        done();

      };
      var cursor = db.collection('records').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Exists False', function() {

    it('Consist of those documents that do not contain the field b', function(done){

      var query = { b: { $exists: false } };

      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc.b).not.to.exist;

        });

        done();

      };
      var cursor = db.collection('records').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
