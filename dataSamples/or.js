function getRandomInt() {
  return Math.floor(Math.random() * 100);
}

var bulk = [];

//at least on object that fulfils the $or exercise criteria
//to eliminate uncertainty conntected to Math.random()

bulk.push(
  {
    _id: 100,
    name: 'product100',
    quantity: 15,
    price: 100
  }
);

for (var i = 0; i < 100; i++){
  bulk.push(
    {
      _id: i,
      name: 'product' + i,
      quantity: getRandomInt(),
      price: getRandomInt()
    }
  )
}

module.exports = bulk;
