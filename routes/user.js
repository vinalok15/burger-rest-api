import express from 'express';
import passport from 'passport';
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from '../controllers/user.js';
import { authrizeAdmin, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get(
  '/googlelogin',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

/*router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile'],
    successRedirect: process.env.FRONTED_URL,
  })
);*/

router.get(
  '/login',
  passport.authenticate('google', {
    successRedirect: process.env.FRONTED_URL,
  }),
  (req, res, next) => {
    res.send('Logged In');
  }
);

router.get('/me', isAuthenticated, myProfile);
router.get('/logout', logout);

router.get('/admin/users', isAuthenticated, authrizeAdmin, getAdminUsers);

router.get('/admin/stats', isAuthenticated, authrizeAdmin, getAdminStats);

export default router;
