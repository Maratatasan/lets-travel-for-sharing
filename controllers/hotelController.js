const Hotel = require('../models/hotel');
// const { all } = require('../app');

// exports.homePage = (req, res) => {
//     // 'index' refers to index.pug
//     // the info in curly braces is sent to the index page
//     // ie const title = 'Lets Travel'
//     res.render('index', { title: 'Lets Travel' });
// }

exports.listAllHotels = async (req, res, next) => {
    try {
        // getting data from database 
        // find method will find all documents in the Hotel collection
        // { available: { $eq: true } } - means only the hotels with available: true will appear
        // the dollar sign($) is mongo query operator that checks for equality

        const allHotels = await Hotel.find({ available: { $eq: true } })
        // the data in curly braces "{}" is passed to all_hotels.pug
        res.render('all_hotels', { title: 'All Hotels', allHotels });
        // res.json(allHotels)
    } catch (error) {
        next(error);
    }
}

exports.listAllCountries = async (req, res, next) => {
    try {
        // distinct - return only unique values ie if in the list [bob, bob, sara] return [bob, sara]
        const allCountries = await Hotel.distinct('country')
        res.render('all_countries', { title: 'Browse by country', allCountries });
    } catch (error) {
        next(error);
    }

}

exports.homePageFilters = async (req, res, next) => {
    try {

        // aggregate - takes in an array of stages
        const hotels = await Hotel.aggregate([
            { $match: { available: true } },
            { $sample: { size: 9 } },
        ]);
        const countries = await Hotel.aggregate([
            { $group: { _id: '$country' } },
            { $sample: { size: 9 } }
        ]);
        res.render('index', { countries, hotels })
        // res.json(countries)

    } catch (error) {
        next(error);
    }
}

exports.admin = (req, res) => {
    res.render('admin', { title: 'Admin' });
}

exports.createHotelGet = (req, res) => {
    res.render('add_hotel', { title: 'Add new hotel' });
}

// async  - it is needed for "await" to work 
exports.createHotelPost = async (req, res, next) => {

    // to see what is sent tto the form 
    // line - res.json(req.body)
    // res.json(req.body)

    // try - it is called the try block
    //to deal with errors
    try {
        const hotel = new Hotel(req.body);
        // await will make sure the top line finishes before
        // running the line
        await hotel.save();
        res.redirect(`/all/${hotel._id}`);
    } catch (error) {
        next(error);// next refers to the passed in next
    }
}

exports.editRemoveGet = (req, res) => {
    res.render('edit_remove', { title: 'Search for hotel to edit or remove' })
}

exports.editRemovePost = async (req, res, next) => {
    try {
        const hotelId = req.body.hotel_id || null;
        const hotelName = req.body.hotel_name || null;
        // { $or: [{ _id: hotelId }, { hotel_name: hotelName }] } - this is a mongo db method within find
        // can be used if something is not present ie - if no input = null, use the variable with input
        const hotelData = await Hotel.find({
            $or: [
                { _id: hotelId },
                { hotel_name: hotelName }
            ]
        }).collation({// collation is for language specific matches 
            locale: 'en', //en - is for english specific text
            strength: 2 // 2 for strength means not case sensitive 
        });

        if (hotelData.length > 0) {
            // res.json(hotelData)
            // res.render('hotel_detail', { title: 'Add / Remove Hotel', hotelData })
            res.render('hotel_detail', { title: 'Add / Remove Hotel', hotelData })
            return
        } else {
            res.redirect('/admin/edit-remove')
        }
    } catch (error) {
        next(error);
    }
}

exports.updateHotelGet = async (res, req, next) => {
    // for some reason have to go a step deeper
    // console.log("---------------------=================------------")
    // console.log(req.req.params)
    // console.log("---------------------=================------------")
    // var res = response.res
    // var req = request.req

    try {
        // findOne will return one record that matches
        // hotelId in req.params.hotelId is related to the :hotelId in index.js line router.get('/admin/:hotelId/update', hotelController.updateHotelGet);

        const hotel = await Hotel.findOne({ _id: req.req.params.hotelId });

        // res.res.json(hotel) // this worked 13/08/2020
        res.res.render('add_hotel', { title: 'Update hotel', hotel });
    } catch (error) {
        next(error)
    }
}
