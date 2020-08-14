var express = require('express');
var router = express.Router();

// require controllers
const hotelController = require('../controllers/hotelController');

/* GET home page. */
router.get('/', hotelController.homePageFilters);

router.get('/all', hotelController.listAllHotels);
// /countries is the url ,hotelController is where the function listAllCountries is stored
router.get('/countries', hotelController.listAllCountries);

// ADMIN Routes:
router.get('/admin', hotelController.admin);
router.get('/admin/add', hotelController.createHotelGet);
router.post('/admin/add', hotelController.createHotelPost);
router.get('/admin/edit-remove', hotelController.editRemoveGet);
router.post('/admin/edit-remove', hotelController.editRemovePost);
router.get('/admin/:hotelId/update', hotelController.updateHotelGet);

module.exports = router;
