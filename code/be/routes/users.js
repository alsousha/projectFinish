import express from 'express';
import {
  updateUser,
  updateUserPassword,
  checkPassword,
  resetPassword,
  updateUserPasswordReset,
  checkToken,
  getArticles,
  getAllCertif,
  sendContactForm,
} from '../controllers/user.js';

const router = express.Router();

router.put('/:id', updateUser);
router.put('/password/:id', updateUserPassword);

router.post('/check-password', checkPassword);
router.post('/reset', resetPassword);
router.post('/send-email', sendContactForm);
router.post('/update-password', updateUserPasswordReset);
router.post('/check_token', checkToken);
router.get('/articles', getArticles);
router.get('/certificates', getAllCertif);

// router.get('/reset-password', resetPassword2);

export default router;
