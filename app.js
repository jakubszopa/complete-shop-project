const path = require('path')
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session')

const createSessionConfig = require('./config/session')
const db = require('./data/database');

const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes =require('./routes/cart.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const SessionCOnfig = createSessionConfig();

app.use(expressSession(SessionCOnfig));
app.use(csrf());

app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware)

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use('/cart',cartRoutes);
app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function () {
    app.listen(3000);
}).catch(function(error) {
    console.log('failed to connect to database!');
    console.log(error);
});