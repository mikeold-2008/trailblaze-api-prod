const express = require('express');
const router = express.Router();
const soloChallengeController = require('../controllers/soloChallengeController');



router.get('/:id', soloChallengeController.getSoloChallengesByUserId)

router.post('/',soloChallengeController.postSoloChallenge)



module.exports = router;