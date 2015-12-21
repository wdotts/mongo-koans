// https://docs.mongodb.org/v3.0/reference/operator/query/or/
var expect = require('chai').expect;

module.exports = function(db){

  describe('Search for a Single Word', function() {

    it('searches for the term "coffee"', function(done){

      var query = { $text: { $search: "coffee" } };
      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){

        //  expect(doc.subject).to.contain('Coffee');
          expect(doc.subject.toLowerCase()).to.have.string('coffee');

        });

        done();

      };
      var cursor = db.collection('text').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Match Any of the Search Terms', function() {

    it('returns documents that contain either "bake" or "coffee" or "cake" in the indexed subject field', function(done){

      var query = { $text: { $search: "bake coffee cake" } };
      var callback = function(err, data){

        expect(data[5]).to.exist; //two resulting documents
        data.forEach(function(doc){

          expect(doc.subject.toLowerCase()).to.satisfy(function(str) {
            return ((str.search('bake') !== -1) || (str.search('coffee') !== -1) || (str.search('cake') !== -1));
          });

        });

        done();

      };
      var cursor = db.collection('text').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Search for a Phrase', function() {

    it('returns documents that contain the phrase "coffee cake"', function(done){

      var query = { $text: { $search: "\"coffee cake\"" } };
      var callback = function(err, data){

        expect(data[0]).to.exist;
        data.forEach(function(doc){
          expect(doc.subject.toLowerCase()).to.have.string('coffee cake');
        });

        done();

      };
      var cursor = db.collection('text').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Exclude Documents That Contain a Term', function() {

    it('searches for documents that contain the words "bake" or "coffee" but do not contain the term "cake"', function(done){

      var query = { $text: { $search: "bake coffee -cake" } };


      var callback = function(err, data){
        expect(data[0]).to.exist;

        data.forEach(function(doc){
          expect(doc.subject.toLowerCase()).to.satisfy(function(str) {
            return ( ((str.search('bake') !== -1) || (str.search('coffee') !== -1)) && (str.search('cake') == -1));
          });
        });

        done();

      };
      var cursor = db.collection('text').find(query);
      var result = cursor.toArray(callback);

    });
  });

  describe('Return the Text Search Score', function() {

    it('includes an additional field score that contains the document’s score associated with the text search', function(done){

      var query = { $text: { $search: "cake" } };
      var projection = { score: { $meta: "textScore" } };


      var callback = function(err, data){
        expect(data[0]).to.exist;

        data.forEach(function(doc){
          expect(doc).to.include.keys('score');
          expect(doc.score).to.be.a('number');
        });

        done();

      };
      var cursor = db.collection('text').find(query, projection);
      var result = cursor.toArray(callback);

    });
  });

  describe('Sort by Text Search Score', function() {

    it('includes an additional field score that contains the document’s score associated with the text search', function(done){

      var query = { $text: { $search: "cake" } };
      var projection = { score: { $meta: "textScore" } };
      var sort = { score: { $meta: "textScore" } };


      var callback = function(err, data){
        expect(data[0]).to.exist;

        var prev_doc_score;

        data.forEach(function(doc){
          if (prev_doc_score) {
            expect( prev_doc_score ).to.be.above( doc.score );
          }
          prev_doc_score = doc.score;

          expect(doc).to.include.keys('score');
          expect(doc.score).to.be.a('number');
        });

        done();

      };
      var cursor = db.collection('text').find(query, projection).sort( sort );
      var result = cursor.toArray(callback);

    });
  });

  describe('Return Top 3 Matching Documents', function() {

    it('includes an additional field score that contains the document’s score associated with the text search', function(done){

      var query = { $text: { $search: "cake" } };
      var projection = { score: { $meta: "textScore" } };
      var sort = { score: { $meta: "textScore" } };
      var limit = 3;


      var callback = function(err, data){
        expect(data).to.have.length(3);

        var prev_doc_score;

        data.forEach(function(doc){
          if (prev_doc_score) {
            expect( prev_doc_score ).to.be.above( doc.score );
          }
          prev_doc_score = doc.score;

          expect(doc).to.include.keys('score');
          expect(doc.score).to.be.a('number');
        });

        done();

      };
      var cursor = db.collection('text').find(query, projection).sort( sort ).limit( limit );
      var result = cursor.toArray(callback);

    });
  });

  describe('Text Search with Additional Query and Sort Expressions', function() {

    it('searches for documents with status equal to "A" that contain the terms coffee or cake in the indexed field subject and specifies a sort order of ascending date, descending text score', function(done){

      var query = { status: "A", $text: { $search: "coffee cake" } };
      var projection = { score: { $meta: "textScore" } };
      var sort = { date: 1, score: { $meta: "textScore" } };

      var callback = function(err, data){
        expect(data).to.exist;

        var prev_doc_score;
        var prev_doc_date;

        data.forEach(function(doc){
          if (prev_doc_date) {
            if (prev_doc_date.getTime() === doc.date.getTime()){
              expect( prev_doc_score ).to.be.at.least( doc.score );
            }
            expect( prev_doc_date.getTime() ).to.be.at.most( doc.date.getTime() );
          }
          prev_doc_date = doc.date;
          prev_doc_score = doc.score;

          expect(doc).to.include.keys('score');
          expect(doc.score).to.be.a('number');
        });

        done();

      };
      var cursor = db.collection('text').find(query, projection).sort( sort );
      var result = cursor.toArray(callback);

    });
  });

  //Search a Different Language - a test to add

}
