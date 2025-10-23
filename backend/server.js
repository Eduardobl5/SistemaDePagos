import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './database/db.js'
import userRouter from './routes/userRoute.js'

dotenv.config()

const PORT = process.env.PORT

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Servidor corriendo")
})

app.use("/", userRouter);

app.listen(PORT, async (req, res) => {
    try {
        await db.authenticate();
        console.log("Conexion exitosa a la base de datos");
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.error(error)
    }
})