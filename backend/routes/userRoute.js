import Router from "express"
import { deleteUser, getUserById, getUsers, login, registerUSer, updateUser } from "../controller/userController.js";
import { authToken } from "../middleware/verifycation.js";

const userRouter = Router();


userRouter.post("/register", registerUSer)
userRouter.post("/login", login)

userRouter.get("/users", authToken, getUsers)
userRouter.get("/user/:id", authToken, getUserById)
userRouter.put("/user/:id", authToken, updateUser);
userRouter.delete("/user/:id", authToken, deleteUser);

export default userRouter;