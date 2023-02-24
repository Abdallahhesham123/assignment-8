import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import blogRouter from './modules/blog/blog.router.js';
import mongoose from 'mongoose';
import cors from'cors';
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import connectionDb from '../DB/connection.js';
import bodyParser from"body-parser";

const initApp = (app, express) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(cors())
    app.use(bodyParser.json());
    app.use(express.json({}))
    mongoose.set('strictQuery', false)
    connectionDb()
    //for image
    app.use("/images", express.static(path.join(__dirname, "../public/images")));
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/images/social/");
        },
        filename: (req, file, cb) => {
          cb(null, req.body.name);
        },
      });

      const upload = multer({ storage: storage });



    app.get('/', (req, res) => res.send('Hello World!'))


    app.use('/auth', authRouter)
    // app.use('/user', userRouter)
    app.use('/user', upload.single("file"), userRouter)
    app.use('/blog', blogRouter)

    app.use("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })

}


export default initApp