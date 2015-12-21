function getRandomInt() {
  return Math.floor(Math.random() * 100);
}

var bulk = [];

//at least on object that fulfils the $or exercise criteria
//to eliminate uncertainty conntected to Math.random()


bulk.push(
  { _id: 100, name: 'product100', qty: 15, price: 100, sale: true },
  { _id: 101, name: 'product100', qty: 15, price: 1.99, sale : true }, //$and, not equal 1.99
  { _id: 102, name: 'product100', qty: 15, sale: true}, //$and , does it exist?
  { _id: 103, name: 'product100', sale: true} //$exist, qty does not exist
);

for (var i = 0; i < 100; i++){
  bulk.push(
    {
      _id: i,
      name: 'product' + i,
      qty: getRandomInt(),
      price: getRandomInt()
    }
  )
}

module.exports = bulk;
