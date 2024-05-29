const express = require('express');
const router = express.Router();
const soloChallengeController = require('../controllers/soloChallengeController');



router.get('/:id', soloChallengeController.getSoloChallengesByUserId)

router.post('/',soloChallengeController.postSoloChallenge)

router.patch("/:id", soloChallengeController.patchSoloChallengePass)

router.patch('/:id/progress',soloChallengeController.patchSoloChallengeProgress)



module.exports = router;