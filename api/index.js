const express = require('express');
const router = express.Router();

router.use('/features', require('./features'));
router.use('/items', require('./items'));
router.use('/player_features', require('./player_features'));
router.use('/player_spells', require('./player_spells'));
router.use('/player_traits', require('./player_traits'));
router.use('/players', require('./players'));
router.use('/quests', require('./quests'));
router.use('/spells', require('./spells'));
router.use('/traits', require('./traits'));

module.exports = router;