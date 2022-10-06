import { Router } from 'express';
import user from '../controller/user';

const userRouter = Router();

userRouter.get('', user.list);

export default userRouter;