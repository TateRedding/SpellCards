const express = require('express');
const router = express.Router();

router.use('/features', require('./features'));
router.use('/items', require('./items'));
router.use('/player_features', require('./player_features'));
router.use('/player_spells', require('./player_spells'));
router.use('/players', require('./players'));
router.use('/quests', require('./quests'));
router.use('/spells', require('./spells'));

module.exports = router;