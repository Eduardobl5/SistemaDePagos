import Router from "express"
import { authToken } from "../middleware/verifycation.js";
import { createPay, deletePay, getPayById, getPays, getPaysByUser, updatePay } from "../controller/payController.js";

const payRouter = Router();

payRouter.post("/createPay", authToken, createPay)
payRouter.get("/pays", authToken, getPays)
payRouter.get("/pay/:id", authToken, getPayById)
payRouter.put("/pay/:id", authToken, updatePay)
payRouter.delete("/pay/:id", authToken, deletePay)

payRouter.get("/paysByUser", authToken, getPaysByUser)

export default payRouter;