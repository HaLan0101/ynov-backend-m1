const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');
const verifyOwner = require('../middlewares/verifyOwner');
const verifyToken = require('../middlewares/verifyToken');
router.get('/', placeController.getPlaces);
router.get('/:id', placeController.getPlace);
router.get('/search/:search', placeController.searchPlaces);
router.get('/filter', placeController.filterPlaces);
router.post('/', verifyToken, verifyOwner,placeController.createPlace);
router.get('/myPlaces', verifyToken, verifyOwner,placeController.getMyPlaces);
router.get('/my/:id', verifyToken,verifyOwner,placeController.getMyPlace);
router.put('/:id', verifyToken,verifyOwner,placeController.updateMyPlace);
router.delete('/:id', verifyToken,verifyOwner,placeController.deleteMyPlace);


module.exports = router;