var express = require('express');
var router = express.Router();
require('../models/connection');
const Trip = require('../models/trips');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/trips', (req, res) => {
  Trip.find({ 
    departure: {$regex: new RegExp(req.body.departure, 'i')}, 
    arrival: {$regex: new RegExp(req.body.arrival, 'i')}
  })
  .then(data => {
    if(data) {
      res.json({ result: true, tripsFound: data})
    } else {
      res.json({ result: false, error: "No trip found."})
    }
  })
})

router.post('/book', (req, res) => {

})

router.put('/purchase', (req, res) => {

})

router.delete('/cancel', (req, res) => {

})

router.get('/display', (res, req) => {

})
module.exports = router;
