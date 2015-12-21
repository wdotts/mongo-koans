// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){


  describe('Use $all to Match Values', function() {

    it('query the "all" collection for documents where the value of the tags field is an array whose elements include "appliance", "school", and "book"', function(done){
      var query = { tags: { $all: ["appliance", "school", "book" ] } } ;
      var callback = function(err, data){

        expect(data[1]).to.exist; //should return at lesat 2 documents

        data.forEach(function(doc){
          expect(doc.tags).to.include.members([ "appliance", "school", "book" ]);
        });

        done();

      };
      var cursor = db.collection('all').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Use $all with $elemMatch', function() {
    it(' queries the "all" collection for documents where the value of the qty field is an array whose elements match the $elemMatch criteria' , function(done){

      var query = {
        qty: { $all: [
          { "$elemMatch" : { size: "M", num: { $gt: 50} } },
          { "$elemMatch" : { num : 100, color: "green" } }
        ] }
      };

      var callback = function(err, data){

        expect(data[1]).to.exist; //two elements
        data.forEach(function(doc){
          expect(doc).to.satisfy(function(obj) { return ((obj._id === "5234ccb7687ea597eabee677") || (obj._id === "52350353b2eff1353b349de9")) });
        });
        done();

      };
      var cursor = db.collection('all').find(query);
      var result = cursor.toArray(callback);

    });

  });
}
