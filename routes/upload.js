const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/upload');
const router = express.Router();

router.post('/image', passport.authenticate('jwt', { session: false }), upload.single('image'),  controller.image);

module.exports = router;