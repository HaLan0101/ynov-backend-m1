const express = require('express');
const router = express.Router();
const typePlaceController = require('../controllers/typePlace.controller');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyToken = require('../middlewares/verifyToken');
router.get('/', typePlaceController.getTypePlace);
router.post('/', verifyToken,verifyAdmin,typePlaceController.createTypePlace);
router.put('/:id', verifyToken,verifyAdmin,typePlaceController.updateTypePlace);


module.exports = router;