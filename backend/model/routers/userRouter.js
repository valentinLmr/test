import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import User from '../userModel.js';
import data from '../../data.js';
import { generateToken } from '../../utils.js';

const userRouter = express.Router();


userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
     await User.deleteMany()

     const createdUser = await User.insertMany(data.users);
     res.send({createdUser})
    })
)

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(user){
        console.log(' here')
        if(bcrypt.compareSync(req.body.password, user.password)){
            console.log(user)
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({message: 'Invalid email or password'})
}))

export default userRouter