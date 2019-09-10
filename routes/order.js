const express = require('express');
const passport = require('passport');
const controller = require('../controllers/order');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.post('/payment', passport.authenticate('jwt', { session: false }), controller.payment);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = router;