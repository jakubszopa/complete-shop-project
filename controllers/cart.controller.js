const Product = require('../models/product.model');

function addCartItem(req, res, next) {
    let product;
    try {
        product = Product.findById(req.body.productId)

    } catch (error) {
        next(error);
        return;
    }
    const cart = res.locals.cart;

    res.locals.cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: 'cart updated',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addCartItem: addCartItem
}