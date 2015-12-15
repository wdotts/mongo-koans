// { <field>: { $eq: <value> } }
module.exports = function(db){

  it('finds qty that is equal 20 WITH a $ operator', function(done){
    db.collection('eq').find( { qty: { $eq: 20 } } )
    done();
  });

  it('finds qty that is equal 20 WITHOUT a $ operator', function(done){
    db.collection('eq').find( { qty: { $eq: 20 } } )
    done();
  });
}
