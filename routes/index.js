var express = require('express');
var router = express.Router();
require('../models/connection');
const Trip = require('../models/trips');
const Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ajouter req.body.date
router.get('/trips', (req, res) => {
  Trip.find({ 
    departure: {$regex: new RegExp(req.body.departure, 'i')}, 
    arrival: {$regex: new RegExp(req.body.arrival, 'i')}
  })
  .then(data => {
    if(data[0]) {
      res.json({ result: true, tripsFound: data})
    } else {
      res.json({ result: false, error: "No trip found."})
    }
  })
})

router.post('/book', (req, res) => {
  Trip.findById(req.body.id)
  .then (data => {
    const newTripToCart = new Cart({
      trip: data.id,
      isPaid: false
    })
    newTripToCart.save().then(() => {
      res.json({result: true, message: `Le trajet ${data.departure}/${data.arrival} a été ajouté au panier.`})
    })
  })
})

router.put('/purchase', (req, res) => {
updatemany()
})

router.delete('/cancel', (req, res) => {

})

// populate.('trips') ici
router.get('/display', (res, req) => {

})
module.exports = router;
