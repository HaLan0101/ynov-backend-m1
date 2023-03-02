const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const verifyOwner = require('../middlewares/verifyOwner');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', verifyToken, verifyAdmin, bookingController.getBookings);
router.get('/myBookings/get/', verifyToken,bookingController.getMyBookings);
router.get('/myBookingsOwner/get/', verifyToken,verifyOwner,bookingController.getMyBookingsOwner);
router.post('/', verifyToken, bookingController.createReservation);
router.put('/:id', verifyToken, verifyOwner ,bookingController.updateBooking);


module.exports = router;