import express from 'express';
import {AuthController} from '../controller/auth';
import {authJwt} from '../middlewares/authJwt.middlewares';
const router = express.Router();

router.get('/login',AuthController.getLogin);
router.post('/sigup',AuthController.signup)
router.post('/sigin',AuthController.login)
router.get('/users',AuthController.getUser)
router.get('/adminPage',authJwt.verifyToken,AuthController.getAdmin);
router.post('/logout', AuthController.logout);
module.exports = router