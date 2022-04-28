const express = require('express');
const router = express.Router();
const linebot = require('../controllers/lineBotController');

/* POST line web hook. */
router.post('/', linebot.webhook);
module.exports = router;
