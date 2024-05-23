const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/', userController.postUser)
router.get('/auth/:email/:token',userController.getUserPasswordHash)
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser)
router.patch('/:id/friends',userController.patchFriendsList)


module.exports = router;