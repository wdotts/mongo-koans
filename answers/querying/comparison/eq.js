//https://docs.mongodb.org/v3.0/reference/operator/query/eq/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Equals a Specified Value', function() {

    //should return doc1
    doc1 = [
      { _id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] },
      { _id: 5, item: { name: "mn", code: "000" }, qty: 20, tags: [ [ "A", "B" ], "C" ] }
    ];

    it('20 WITH an operator', function(done){
      var query = { qty: { $eq: 20 } };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });

    it('20 WITHOUT an operator', function(done){

      var query = { qty: 20 };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Field in Embedded Document Equals a Value', function() {

    //should return doc1
    var doc1 = [{ _id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] }];

    it('"ab" WITH an operator', function(done){
      var query = { "item.name": { $eq: "ab" } };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });

    it('"ab" WITHOUT an operator', function(done){

      var query = { "item.name": "ab" };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Array Element Equals a Value', function() {

    //should return doc1
    var doc1 = [
      { _id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] },
      { _id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] },
      { _id: 3, item: { name: "ij", code: "456" }, qty: 25, tags: [ "A", "B" ] },
      { _id: 4, item: { name: "xy", code: "456" }, qty: 30, tags: [ "B", "A" ] },
    ];

    it('"B" WITH an operator', function(done){
      var query = { tags: { $eq: "B" } };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });

    it('"B" WITHOUT an operator', function(done){

      var query = { tags: "B" };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Equals an Array Value', function() {

    //should return doc1
    var doc1 = [
      { _id: 3, item: { name: "ij", code: "456" }, qty: 25, tags: [ "A", "B" ] },
      { _id: 5, item: { name: "mn", code: "000" }, qty: 20, tags: [ [ "A", "B" ], "C" ] }
    ];

    it('[ "A", "B" ] WITH an operator', function(done){
      var query = { tags: { $eq: [ "A", "B" ] } };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });

    it('[ "A", "B" ] WITHOUT an operator', function(done){

      var query = { tags: [ "A", "B" ] };
      var callback = function(err, data){

        expect(data).to.eql(doc1);
        done();

      };
      var cursor = db.collection('eq').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
