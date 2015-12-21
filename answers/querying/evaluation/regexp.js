// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){

  describe('Perform Case-Insensitive Regular Expression Match', function() {

    it('"sku" property that begins with ABC Case-Insensitive', function(done){

      var query = { sku: { $regex: /^ABC/i } };
      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

          expect(doc.sku).to.match(/^ABC/i);

        });

        done();

      };
      var cursor = db.collection('regexp').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Multiline Match for Lines Starting with Specified Pattern', function() {

    it('match lines starting with the letter S for multiline strings', function(done){

      var query = { description: { $regex: /^S/, $options: 'm' }};
      var callback = function(err, data){

        expect(data[1]).to.exist; //two resulting documents
        data.forEach(function(doc){

          expect(doc.description).to.match(/^S/m);

        });

        done();

      };
      var cursor = db.collection('regexp').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Use the . Dot Character to Match New Line', function() {

    it('allow the dot character (i.e. .) to match all characters including new line as well as perform a case-insensitive match', function(done){

      var query = { description: { $regex: /m.*line/, $options: 'si' } };
      var callback = function(err, data){

        expect(data[1]).to.exist; //two resulting documents
        data.forEach(function(doc){
          expect(doc.description).to.match(/m[^]+line/i); //[^]+ java script hack for .* match all
        });

        done();

      };
      var cursor = db.collection('regexp').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Ignore White Spaces in Pattern', function() {

    it('ignore white spaces and the comments, denoted by the # and ending with the \n in the matching pattern', function(done){

      var pattern = "abc #category code\n123 #item number"
      var query = { sku: { $regex: pattern, $options: "x" } };


      var callback = function(err, data){
        var result = { "_id" : 100, "sku" : "abc123", "description" : "Single line description." };
        expect(data[0]).to.exist;
        expect(data[0]).to.eql(result);
        done();

      };
      var cursor = db.collection('regexp').find(query);
      var result = cursor.toArray(callback);

    });
  });
}
