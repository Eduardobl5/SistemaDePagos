import jwt from "jsonwebtoken"

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("header recibido", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: "Token no proporcionado"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Token decodificado", decoded);
        req.user = decoded
        next();
    } catch (error) {
        console.error("Error al verificar el token", error.message);
        return res.status(401).json({message: "Token invalido o expirado"})
    }
}