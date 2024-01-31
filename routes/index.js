var express = require('express');
var router = express.Router();
const moment = require('moment');
require('../models/connection');
const Trip = require('../models/trips');
const Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ajouter req.body.date
router.get('/trips/:departure/:arrival/:date', (req, res) => {
  Trip.find({ 
    departure: {$regex: new RegExp(req.params.departure, 'i')}, 
    arrival: {$regex: new RegExp(req.params.arrival, 'i')},
    date: {$gte: moment(req.params.date, "DD-MM-YYYY").startOf('day'),$lte: moment(req.params.date, "DD-MM-YYYY").endOf('day')}
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
Cart.updateMany({isPaid: false},{isPaid: true})
.then(() => {
  res.json({result: true, message: 'Les éléments du panier ont été payé.' })
})
})

router.delete('/cancel', (req, res) => {
Cart.deleteOne({_id: req.body.id}).then(() => {
  res.json({result: true, message: 'Ce trajet a été supprimé du panier.'})
})
})

router.get('/display', (req, res) => {
Cart.find()
.populate('trip')
.then(data => {
  const dataIsPaidTrue = data.filter(doc => doc.isPaid === true);
  const dataIsPaidFalse = data.filter(doc => doc.isPaid === false);
    res.json({result: true, dataTrue: dataIsPaidTrue, dataFalse: dataIsPaidFalse })
})
})
module.exports = router;
