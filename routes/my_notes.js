var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });

});

// req - is object containing all information, containing data from http request - used to request data from server
// res - the data received from server 
// req - data in to the server 
// res - data from the server
// /all - the path added to the url ie hotel.com/all
// All hotels - page title
router.get('/all', function (req, res) {
  //opens page all_hotels.pug with the title
  res.render('all_hotels', { title: 'All Hotels' })

});
// /: - makes the name dynamic
router.get('/all/:name', function (req, res) {
  // accessing request data
  // the information after all/{this part} 
  // ie /all/bob
  const name = req.params.name;
  // const name = "bob"

  res.render('all_hotels', { title: 'All Hotels', name })//need to add the name(in this case - name) of the variable here to access it on the page

});
// /* - will run the function when any data entered
// will not save the data
router.get('/all/*/', function (req, res) {

  const name = req.params.name;


  res.render('all_hotels', { title: 'All Hotels', name })

});

module.exports = router;
