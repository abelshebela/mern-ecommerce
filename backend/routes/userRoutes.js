const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getUsers);
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.get('/verify/:token', verifyEmail);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
