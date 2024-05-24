const express = require('express');
const router = express.Router();
const twoPersonChallengeController = require('../controllers/twoPersonChallengeController');

router.get('/:id',twoPersonChallengeController.getTwoPersonChallengesByUserId)

router.post('/',twoPersonChallengeController.postTwoPersonChallenge)

router.patch('/:challenge_id/accepted',twoPersonChallengeController.patchChallengeAccepted)

module.exports = router