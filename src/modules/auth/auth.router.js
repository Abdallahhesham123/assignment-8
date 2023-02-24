import {Router} from 'express'
import { AuthUser } from '../../middleware/AuthUser.js';
import * as authController from  './controller/auth.js'
const router = Router();


router.get("/" , authController.getAuthModule)
router.post("/register" , authController.register)
router.post("/login" , authController.login)
router.put("/resetpassword" , AuthUser,authController.resetpassword)
export default  router