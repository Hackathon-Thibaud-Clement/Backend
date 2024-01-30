const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    trip : { type: mongoose.Schema.Types.ObjectId, ref :'trips'},
    isPaid: Boolean,
})

//Penser à faire l'instruction .populate('trip') dans un find/findOne pour rajouter les éléments de la clé étrangère

const Cart = mongoose.model('carts', cartSchema)

module.exports = Cart;