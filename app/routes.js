
var Store = require('./models/store');
var Sale  = require('./models/sale');

module.exports = function(app, express) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    var router = express.Router();

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    // on routes that end in /stores
    // ----------------------------------------------------
    router.route('/stores')

        // create a store (accessed at POST http://localhost:8080/api/stores)
        .post(function(req, res) {

            var store = new Store();
            store.name = req.body.name;
            store.manager = req.body.manager;
            store.highSaleDay = req.body.highSaleDay;
            store.highSaleWeek = req.body.highSaleWeek;
            store.highSaleMonth = req.body.highSaleMonth;

            // save the store and check for errors
            store.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Store created!' });
            });

        })

        // get all the stores (accessed at GET http://localhost:8080/api/stores)
        .get(function(req, res) {

            Store.find(function(err, stores) {
                if (err)
                    console.log('Get stores error: ' + err);

                console.log('Got stores: ' + stores);
            });

            Store.find(function(err, stores) {
                if (err)
                    res.send(err);

                res.json(stores);
            });
        });

    // on routes that end in /sales
    // ----------------------------------------------------
    router.route('/sales')

        // create a sale (accessed at POST http://localhost:8080/api/sales)
        .post(function(req, res) {

            var sale = new Sale();
            sale.amount = req.body.amount;
            sale.date = req.body.date;
            sale.store = req.body.store;

            // save the sale and check for errors
            sale.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'sale created!' });
            });

        })

        // get all the sales (accessed at GET http://localhost:8080/api/sales)
        .get(function(req, res) {

            Sale.find(function(err, sales) {
                if (err)
                    console.log('Get sales error: ' + err);

                console.log('Got sales: ' + sales);
            });

            Sale.find(function(err, sales) {
                if (err)
                    res.send(err);

                res.json(sales);
            });
        });

    // on routes that end in /sales/:sale_id
// ----------------------------------------------------
    router.route('/sales/:stale_id')

        // get the sale with that id (accessed at GET http://localhost:8080/api/sales/:sale_id)
        .get(function(req, res) {
            Sale.findById(req.params.sale_id, function(err, sale) {
                if (err)
                    res.send(err);
                res.json(sale);
            });
        })

        // update the sale with this id (accessed at PUT http://localhost:8080/api/sales/:sale_id)
        .put(function(req, res) {

            // use our sale model to find the sale we want
            Sale.findById(req.params.sale_id, function(err, sale) {

                if (err)
                    res.send(err);

                sale.name = req.body.name; 	// update the sales info

                // save the sale
                sale.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Nerd updated!' });
                });

            });
        })

        // delete the sale with this id (accessed at DELETE http://localhost:8080/api/sales/:nerd_id)
        .delete(function(req, res) {
            Sale.remove({
                _id: req.params.sale_id
            }, function(err, sale) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });


    app.use('/api', router);
};