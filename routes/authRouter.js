import { Router } from 'express';
const router = Router();
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
  necrology,
} from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);
router.get('/necrology', necrology);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

export default router;
