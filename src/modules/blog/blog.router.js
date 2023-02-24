import {Router} from 'express'
import { AuthUser } from '../../middleware/AuthUser.js';
import { Admin } from '../../middleware/Admin.js';
import * as blogController from  './controller/blog.js'
const router = Router();

router.get("/allBlog/" , blogController.getAllBlog)
router.get("/" , blogController.getCommentModule)
router.get("/dash" , Admin,blogController.getComments)
router.get("/search" , AuthUser,blogController.searchpost)
router.put("/acceptedpost/:id" ,Admin, blogController.acceptedpost)
router.delete("/removepost/:id" ,Admin, blogController.removepost)
router.put("/restoreComment/:id" ,Admin, blogController.restoreComment)


router.post("/" ,AuthUser, blogController.addComment)
router.get("/:id" , AuthUser, blogController.getCommentById)
router.put("/updateBlog/:id" ,AuthUser, blogController.updateComment)
router.delete("/deleteBlog/:id" ,AuthUser, blogController.deleteComment)

export default  router