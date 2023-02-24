import {Router} from 'express'
import { Admin } from '../../middleware/Admin.js';
import { AuthUser } from '../../middleware/AuthUser.js';
import * as userController from  './controller/user.js'
const router = Router();

//get all users
router.get("/" , AuthUser,userController.getUserModule)
//update with diffrent methode
router.put("/findByIdAndUpdate/:id" , AuthUser,userController.findByIdAndUpdate)
//delete with diffrent methode
router.delete("/findOneAndDelete/:id" , AuthUser, userController.findOneAndDelete)


router.get("/getAllTrashedUsers" ,Admin, userController.getAllTrashedUsers)
router.get("/getprofile/" ,AuthUser,userController.getUserById)



export default  router